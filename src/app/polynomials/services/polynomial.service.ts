import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Polynomial} from "../types/types";
import {Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {
  loadCurrentPolynomial,
  loadPolynomials,
  loadPolynomialsFailure,
  loadPolynomialsSuccess
} from "../../reducers/polynomial.actions";
import {selectCurrentPolynomial, selectPolynomialList} from "../../reducers/polynomial.selectors";

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
          console.log('saved successfully');

          // TODO causes unwanted behaviour, rework it before implementing.
          // this.store.select(selectPolynomialList).subscribe(list => {
          //   const polynomial = list[0];
          //   this.store.dispatch(loadCurrentPolynomial({ polynomial }));
          // })
        },
        error: (error) => {
          console.log(error)
        }
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
        },
        error: (error) => {
          console.log(error)
        }
      });
  }
}
