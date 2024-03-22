import {Component} from '@angular/core';
import {Variable, Polynomial} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PolynomialService} from "../../services/polynomial.service";
import {Store} from "@ngrx/store";
import {
  selectCurrentPolynomial,
  selectCurrentRange,
  selectCurrentVariables
} from "../../../reducers/polynomial.selectors";
import {Observable, take} from "rxjs";
import {VariablesService} from "../../services/variables.service";
import {RESET_POLYNOMIAL} from "../../../reducers/polynomial.actions";

@Component({
  selector: 'app-variable-buttons',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './variable-buttons.component.html',
  styleUrl: './variable-buttons.component.scss'
})
export class VariableButtonsComponent {
  variables$?: Observable<Variable[]> = this.store.select(selectCurrentVariables);
  polynomial$?: Observable<Polynomial> = this.store.select(selectCurrentPolynomial);

  constructor(
    private store: Store,
    private polyService: PolynomialService,
    private varService: VariablesService
  ) {
  }

  saveToDataBase() {
    this.polynomial$!.subscribe(poly => {
      const polynomial: Polynomial = {
        id: null,
        variables: poly.variables,
        rangeStart: poly.rangeStart,
        rangeEnd: poly.rangeEnd
      }
      this.polyService.savePolynomial(polynomial);
    })
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
