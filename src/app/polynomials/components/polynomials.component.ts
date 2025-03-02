import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DataInputComponent} from "./data-input/data-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {GraphData, Polynomial, Variable} from "../types/types";
import {VariableButtonsComponent} from "./variable-buttons/variable-buttons.component";
import {PolynomialService} from "../services/polynomial.service";
import {RangeInputComponent} from "./range-input/range-input.component";
import {FunctionGraphComponent} from "./function-graph/function-graph.component";
import {select, Store} from "@ngrx/store";
import {loadPolynomials} from "../../reducers/polynomial.actions";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RecentPolynomialsComponent} from "./recent-polynomials/recent-polynomials.component";
import {
  selectAppState,
  selectBestSolution,
  selectCurrentPolynomial,
  selectCurrentRange,
  selectCurrentVariables, selectGraphData,
} from "../../reducers/polynomial.selectors";
import {Observable, take} from "rxjs";
import {FunctionService} from "../services/function.service";
import {AnnealingService} from "../services/annealing.service";
import {User} from "../../users/types/user.interface";

@Component({
  selector: 'app-polynomials',
  standalone: true,
  imports: [
    DataInputComponent,
    NgForOf,
    VariableButtonsComponent,
    RangeInputComponent,
    FunctionGraphComponent,
    MatCard,
    MatCardContent,
    RecentPolynomialsComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './polynomials.component.html',
  styleUrl: './polynomials.component.scss'
})
export class PolynomialsComponent implements OnInit {

  variables$: Observable<Variable[]> = this.store.select(selectCurrentVariables);
  range$: Observable<number[]> = this.store.select(selectCurrentRange);
  data$: Observable<GraphData[]> = this.store.select(selectGraphData);
  bestSolution$: Observable<GraphData> = this.store.select(selectBestSolution);
  polynomial$: Observable<Polynomial> = this.store.select(selectCurrentPolynomial);
  protected user: User | null = null;

  constructor(
    private polyService: PolynomialService,
    private functionService: FunctionService,
    private annealingService: AnnealingService,
    protected store: Store<{ polynomials: Polynomial[] }>
  ) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.user = JSON.parse(token);
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAppState), take(1)).subscribe(state => {
      if (state.user) {
        this.user = state.user;
      }
      this.store.dispatch(loadPolynomials());
      if (this.user) {
        this.polyService.loadPolynomialsAndDispatch(this.user.id);
      }
    });

    this.polynomial$!
      .subscribe((polynomial) => {
        this.functionService.populateGraph(
          polynomial.variables,
          [polynomial.rangeStart, polynomial.rangeEnd]
        )
        this.annealingService.calculateAnnealing(
          polynomial.variables,
          [polynomial.rangeStart, polynomial.rangeEnd]
        )
      });


  }
}
