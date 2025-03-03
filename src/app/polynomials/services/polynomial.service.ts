import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EditablePolynomial, NewPolynomial, NewVariable, Polynomial, Variable} from "../types/types";
import {Observable, take} from "rxjs";
import {select, Store} from "@ngrx/store";
import {
  loadCurrentPolynomial,
  loadPolynomials,
  loadPolynomialsFailure,
  loadPolynomialsSuccess,
  reloadPolynomialsWithCurrentPolySuccess
} from "../../reducers/polynomial.actions";
import {selectAppState, selectPolynomialList} from "../../reducers/polynomial.selectors";

@Injectable({
  providedIn: 'root'
})
export class PolynomialService {

  // private polynomialURL = 'http://localhost:8080/api/polynomials';
  private polynomialURL = 'https://polynomial-api-latest.onrender.com/api/polynomials';

  constructor(private http: HttpClient, private store: Store) {
  }

  getPolynomialsFromApi(userId: number): Observable<Polynomial[]> {
    return this.http.get<Polynomial[]>(`${this.polynomialURL}/forUser/${userId}`);
  }

  loadPolynomialsAndDispatch(userId: number) {
    this.getPolynomialsFromApi(userId).subscribe({
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

  reloadPolynomialsAndDispatch(userId: number) {
    this.getPolynomialsFromApi(userId).subscribe({
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

  reloadPolynomialsAfterUpdate(polynomial: Polynomial) {
    this.store.pipe(select(selectAppState), take(1)).subscribe(state => {
      if (state.user) {
        this.getPolynomialsFromApi(state.user.id).subscribe({
            next: (polynomials) => {
              this.store.dispatch(loadPolynomials());
              this.store.dispatch(loadPolynomialsSuccess({polynomials}));
              this.store.dispatch(loadCurrentPolynomial({polynomial}))
            },
            error: (error) => {
              this.store.dispatch(loadPolynomialsFailure({error}))
            },
          }
        )
      }
    });
  }

  savePolynomial(polynomial: NewPolynomial, userId: number): void {
    const polynomialWithUser = {
      ...polynomial,
      userId: userId,
    }
    this.http.post<Polynomial>(this.polynomialURL, polynomialWithUser)
      .subscribe({
        next: () => {
          this.reloadPolynomialsAndDispatch(userId);
        },
        complete: () => {
          console.log('saved successfully:');
        }
      });
  }

  deletePolynomial(id: number, userId: number): void {
    this.http.delete(`${this.polynomialURL}/${id}`)
      .subscribe({
        next: () => {
          this.reloadPolynomialsAndDispatch(userId);
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
        if (polynomial !== undefined) {
          this.store.dispatch(loadCurrentPolynomial({polynomial}));
        }
      })
  }

  updatePolynomial(id: number, toUpdatePolynomial: Polynomial, userId: number): void {
    const existingVariables: Variable[] = toUpdatePolynomial.variables
      .filter(v => v.id > 0);
    const addedVariables: NewVariable[] = toUpdatePolynomial.variables
      .filter(v => v.id < 0)
      .map(({id, ...rest}) => ({...rest}));

    const polynomial: EditablePolynomial = {
      id: toUpdatePolynomial.id,
      variables: [...existingVariables, ...addedVariables],
      rangeStart: toUpdatePolynomial.rangeStart,
      rangeEnd: toUpdatePolynomial.rangeEnd,
      userId,
    }

    this.http.put(`${this.polynomialURL}/${id}`, polynomial)
      .subscribe({
        next: (returnEntity: Object) => {
          const polynomial: Polynomial = returnEntity as Polynomial;
          this.reloadPolynomialsAfterUpdate(polynomial);
        },
        complete: () => {
          console.log('updated successfully');
        }
      });
  }
}
