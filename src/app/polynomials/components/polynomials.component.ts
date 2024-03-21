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
import {initialRange, initialVariables} from "../initialValues/polynomial.initialValues";
import {loadPolynomials} from "../../reducers/polynomial.actions";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RecentPolynomialsComponent} from "./recent-polynomials/recent-polynomials.component";
import {selectPolynomialList} from "../../reducers/polynomial.selectors";
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
  range: number[] = [ ...initialRange ];
  variables: Variable[] = [ ...initialVariables ];
  polynomials$?: Observable<PolynomialEntity[]> = this.store.select(selectPolynomialList);

  data: GraphData[] = [];

  constructor(
    private polyService: PolynomialService,
    private functionService: FunctionService,
    private store: Store<{ polynomials: PolynomialEntity[] }>
  ) { }

  ngOnInit(): void {
      this.store.dispatch(loadPolynomials());
      this.polyService.loadPolynomialsAndDispatch();
  }

  onVariableChange(newValue: string, index: number) {
    this.variables[index].value = parseFloat(newValue);
    this.data = this.functionService.populateGraph(this.variables, this.range);
    console.log(this.data)
  }

  onRangeChange(newValue: string, index: number) {
    this.range[index] = parseFloat(newValue);
    this.data = this.functionService.populateGraph(this.variables, this.range);
    console.log(this.data)
  }

}
