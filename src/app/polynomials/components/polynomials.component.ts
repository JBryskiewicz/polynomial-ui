import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {DataInputComponent} from "./data-input/data-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {GraphData, PolynomialEntity, Variable} from "../types/types";
import {VariableButtonsComponent} from "./variable-buttons/variable-buttons.component";
import {PolynomialService} from "../services/polynomial.service";
import {RangeInputComponent} from "./range-input/range-input.component";
import {FunctionGraphComponent} from "./function-graph/function-graph.component";
import {FunctionService} from "../services/function.service";
import {Store} from "@ngrx/store";
import {loadPolynomials} from "../../reducers/polynomial.actions";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RecentPolynomialsComponent} from "./recent-polynomials/recent-polynomials.component";
import {
  selectCurrentRange,
  selectCurrentVariables,
  selectGraphData,
  selectPolynomialList
} from "../../reducers/polynomial.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-polynomials',
  standalone: true,
  imports: [
    DataInputComponent,
    MatIcon,
    MatMiniFabButton,
    NgForOf,
    VariableButtonsComponent,
    RangeInputComponent,
    FunctionGraphComponent,
    MatCard,
    MatCardContent,
    MatButton,
    RecentPolynomialsComponent,
    AsyncPipe
  ],
  templateUrl: './polynomials.component.html',
  styleUrl: './polynomials.component.scss'
})
export class PolynomialsComponent implements OnInit {
  range$?: Observable<number[]> = this.store.select(selectCurrentRange);
  variables$?: Observable<Variable[]> = this.store.select(selectCurrentVariables);

  polynomials$?: Observable<PolynomialEntity[]> = this.store.select(selectPolynomialList);
  data$?: Observable<GraphData[]> = this.store.select(selectGraphData);

  constructor(
    private polyService: PolynomialService,
    private functionService: FunctionService,
    private store: Store<{ polynomials: PolynomialEntity[] }>
  ) { }

  ngOnInit(): void {
      this.store.dispatch(loadPolynomials());
      this.polyService.loadPolynomialsAndDispatch();
  }

  // TODO implement on change global state range & variables ,
  //  so graph adjusts according to the global state.
  onVariableChange(newValue: string, index: number) {
    // this.variables[index].value = parseFloat(newValue);
    // console.log(parseFloat(newValue));
    // this.functionService.populateGraph(this.variables, this.range$);
  }

  onRangeChange(newValue: string, index: number) {
    // this.range$[index] = parseFloat(newValue);
    // this.functionService.populateGraph(this.variables, this.range$);
  }

}
