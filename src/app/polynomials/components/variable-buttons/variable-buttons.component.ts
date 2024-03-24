import {Component} from '@angular/core';
import {Variable, Polynomial, NewPolynomial, NewVariable} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PolynomialService} from "../../services/polynomial.service";
import {Store} from "@ngrx/store";
import {
  selectCurrentPolynomial,
  selectCurrentVariables
} from "../../../reducers/polynomial.selectors";
import {Observable, take} from "rxjs";
import {VariablesService} from "../../services/variables.service";
import {RESET_POLYNOMIAL} from "../../../reducers/polynomial.actions";
import {AsyncPipe, NgIf} from "@angular/common";
import {AnnealingService} from "../../services/annealing.service";

@Component({
  selector: 'app-variable-buttons',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './variable-buttons.component.html',
  styleUrl: './variable-buttons.component.scss'
})
export class VariableButtonsComponent {
  variables$: Observable<Variable[]> = this.store.select(selectCurrentVariables);
  polynomial$: Observable<Polynomial> = this.store.select(selectCurrentPolynomial);
  id: number = 0;

  constructor(
    private store: Store,
    private polyService: PolynomialService,
    private varService: VariablesService,
  ) {
    this.polynomial$!.subscribe(poly => {
      this.id = poly.id!;
    })
  }

  saveToDataBase() {
    const subscribe = this.polynomial$!.subscribe(poly => {
      const newVariables: NewVariable[] = poly.variables
        .map(({position, value}) => ({position, value}));

      const polynomial: NewPolynomial = {
        variables: newVariables,
        rangeStart: poly.rangeStart,
        rangeEnd: poly.rangeEnd
      }

      this.polyService.savePolynomial(polynomial);
    })
    subscribe.unsubscribe();
  }

  editPolynomial(): void {
    this.polynomial$!
      .pipe(take(1))
      .subscribe(polynomial => {
        this.polyService.updatePolynomial(polynomial.id!, polynomial);
      });
  }

  addVariable(): void {
    this.variables$!
      .pipe(take(1))
      .subscribe(variables => {
        this.varService.addToCurrentVariables(variables)
      });
  }

  removeVariable(): void {
    this.variables$!
      .pipe(take(1))
      .subscribe(variables => {
        this.varService.removeFromCurrentVariables(variables)
      })
  }

  resetCurrentPolynomial(): void {
    this.store.dispatch(RESET_POLYNOMIAL());
  }

}
