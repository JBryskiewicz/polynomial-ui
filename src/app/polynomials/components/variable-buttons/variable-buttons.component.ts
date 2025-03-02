import {Component} from '@angular/core';
import {Variable, Polynomial, NewPolynomial, NewVariable} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PolynomialService} from "../../services/polynomial.service";
import {select, Store} from "@ngrx/store";
import {
  selectAppState,
  selectCurrentPolynomial,
  selectCurrentVariables
} from "../../../reducers/polynomial.selectors";
import {Observable, take} from "rxjs";
import {VariablesService} from "../../services/variables.service";
import {RESET_POLYNOMIAL} from "../../../reducers/polynomial.actions";
import {AsyncPipe, NgIf} from "@angular/common";
import {AnnealingService} from "../../services/annealing.service";
import {User} from "../../../users/types/user.interface";

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
  user: User | null = null;
  id: number = 0;

  constructor(
    private store: Store,
    private polyService: PolynomialService,
    private varService: VariablesService,
  ) {
    this.polynomial$!.subscribe(poly => {
      this.id = poly.id!;
    })
    this.store.pipe(select(selectAppState), take(1)).subscribe(state => {
      if (state.user) {
        this.user = state.user
      }
    });
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
      if (this.user) {
        this.polyService.savePolynomial(polynomial, this.user.id);
      }
    })
    subscribe.unsubscribe();
  }

  editPolynomial(): void {
    this.polynomial$!
      .pipe(take(1))
      .subscribe(polynomial => {
        if (this.user) {
          this.polyService.updatePolynomial(polynomial.id!, polynomial, this.user.id);
        }
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
