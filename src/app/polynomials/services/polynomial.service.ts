import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Polynomial, PolynomialEntity} from "../types/types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PolynomialService {
  private polynomialURL = 'http://localhost:8080/api/polynomials';

  constructor(private http: HttpClient) {
  }

  getAllPolynomials(): Observable<PolynomialEntity[]> {
    return this.http.get<PolynomialEntity[]>(this.polynomialURL);
  }

  savePolynomial(polynomial: Polynomial): void {
    this.http.post<Polynomial>(this.polynomialURL, polynomial)
      .subscribe({
        next: () => console.log('saved successfully'),
        error: (error) => console.log(error)
      });
  }

  deletePolynomial(id: number): void {
    this.http.delete(`${this.polynomialURL}/${id}`)
      .subscribe({
        next: () => console.log('deleted successfully'),
        error: (error) => console.log(error)
      });
  }
}
