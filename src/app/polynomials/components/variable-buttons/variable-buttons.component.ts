import {Component} from '@angular/core';
import {Variable, Polynomial} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PolynomialService} from "../../services/polynomial.service";
import {Store} from "@ngrx/store";
import {selectCurrentRange, selectCurrentVariables} from "../../../reducers/polynomial.selectors";
import {Observable, take} from "rxjs";
import {VariablesService} from "../../services/variables.service";

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
  range$?: Observable<number[]> = this.store.select(selectCurrentRange);

  constructor(
    private store: Store,
    private polyService: PolynomialService,
    private varService: VariablesService
  ) {
  }

  saveToDataBase() {
    let variables: Variable[] = [];
    const varSub = this.variables$!.subscribe(data => {
      variables = data
    });

    let range: number[] = [];
    const rangeSub = this.range$!.subscribe(data => {
      range = data;
    })

    const polynomial: Polynomial = {
      id: null,
      variables: variables,
      rangeStart: range[0],
      rangeEnd: range[1]
    }

    varSub.unsubscribe();
    rangeSub.unsubscribe();

    this.polyService.savePolynomial(polynomial);
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
}
