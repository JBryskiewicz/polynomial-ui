import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Polynomial} from "../../types/types";
import {PolynomialService} from "../../services/polynomial.service";
import {Observable} from "rxjs";
import {selectCurrentPolynomial, selectPolynomialList} from "../../../reducers/polynomial.selectors";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-recent-polynomials',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './recent-polynomials.component.html',
  styleUrl: './recent-polynomials.component.scss'
})
export class RecentPolynomialsComponent{

  polynomial$: Observable<Polynomial> = this.store.select(selectCurrentPolynomial);
  polynomials$: Observable<Polynomial[]> = this.store.select(selectPolynomialList);

  constructor(private polyService: PolynomialService, private store: Store) { }

  polynomialView(id: number): void {
    this.polyService.viewPolynomial(id);
  }

  polynomialDelete(id: number): void {
    this.polyService.deletePolynomial(id);
  }
}
