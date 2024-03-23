import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPolynomial, Polynomial} from "../types/types";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  loadCurrentPolynomial,
  loadPolynomials,
  loadPolynomialsFailure,
  loadPolynomialsSuccess,
  reloadPolynomialsWithCurrentPolySuccess
} from "../../reducers/polynomial.actions";
import {selectPolynomialList} from "../../reducers/polynomial.selectors";

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
    this.getPolynomialsFromApi().subscribe({
        next: (polynomials) => {
          this.store.dispatch(loadPolynomials());
          this.store.dispatch(loadPolynomialsSuccess({polynomials}));
        },
        error: (error) => {
          this.store.dispatch(loadPolynomialsFailure({error}))
        },
      }
    )
  }

  reloadPolynomialsAndDispatch() {
    this.getPolynomialsFromApi().subscribe({
        next: (polynomials) => {
          this.store.dispatch(loadPolynomials());
          this.store.dispatch(reloadPolynomialsWithCurrentPolySuccess({polynomials}));
        },
        error: (error) => {
          this.store.dispatch(loadPolynomialsFailure({error}))
        },
      }
    )
  }

  savePolynomial(polynomial: NewPolynomial): void {
    this.http.post<Polynomial>(this.polynomialURL, polynomial)
      .subscribe({
        next: () => {
          this.reloadPolynomialsAndDispatch();
          console.log('saved successfully:');
        },
      });
  }

  deletePolynomial(id: number): void {
    this.http.delete(`${this.polynomialURL}/${id}`)
      .subscribe({
        next: () => {
          this.reloadPolynomialsAndDispatch();
        },
        complete: () => {
          console.log('deleted successfully');
        }
      });
  }

  viewPolynomial(id: number): void {
    this.store.select(selectPolynomialList)
      .subscribe(list => {
        const polynomial: Polynomial = list.find(p => p.id === id)!;
        this.store.dispatch(loadCurrentPolynomial({polynomial}));
      })
  }

  updatePolynomial(id: number, toUpdatePolynomial: Polynomial): void {
    this.http.put(`${this.polynomialURL}/${id}`, toUpdatePolynomial)
      .subscribe({
        next: () => {
          console.log('updated successfully')
        }
      });
  }
}
