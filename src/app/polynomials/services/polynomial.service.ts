import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Polynomial} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class PolynomialService {
  private polynomialURL = 'http://localhost:8080/api/polynomials';

  constructor(private http: HttpClient) {
  }

  savePolynomial(polynomial: Polynomial): void {
    this.http.post<Polynomial>(this.polynomialURL, polynomial)
      .subscribe({
        next: () => console.log('saved successfully'),
        error: (error) => console.log(error)
      });
  }
}
