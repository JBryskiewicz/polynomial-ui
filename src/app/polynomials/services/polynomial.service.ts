import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Polynomial} from "../types/types";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {loadPolynomials, loadPolynomialsFailure, loadPolynomialsSuccess} from "../../reducers/polynomial.actions";

@Injectable({
  providedIn: 'root'
})
export class PolynomialService {
  private polynomialURL = 'http://localhost:8080/api/polynomials';

  constructor(private http: HttpClient, private store: Store) {
  }

  getPolynomialsFromApi(): Observable<Polynomial[]> {
    return this.http.get<Polynomial[]>(this.polynomialURL);
  }

  loadPolynomialsAndDispatch() {
    this.store.dispatch(loadPolynomials());
    this.getPolynomialsFromApi().subscribe({
        next: (polynomials) => {
          this.store.dispatch(loadPolynomialsSuccess({polynomials}));
        },
        error: (error) => this.store.dispatch(loadPolynomialsFailure({error}))
      }
    )
  }

  savePolynomial(polynomial: Polynomial): void {
    this.http.post<Polynomial>(this.polynomialURL, polynomial)
      .subscribe({
        next: () => {
          this.loadPolynomialsAndDispatch();
          console.log('saved successfully')
        },
        error: (error) => console.log(error)
      });
  }

  deletePolynomial(id: number): void {
    this.http.delete(`${this.polynomialURL}/${id}`)
      .subscribe({
        next: () => {
          this.loadPolynomialsAndDispatch();
          console.log('deleted successfully')
        },
        error: (error) => console.log(error),
      });
  }
}
