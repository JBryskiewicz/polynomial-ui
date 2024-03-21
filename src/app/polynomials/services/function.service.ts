import {Injectable} from "@angular/core";
import {GraphData, Variable} from "../types/types";
import {Store} from "@ngrx/store";
import {loadGraphWithData} from "../../reducers/polynomial.actions";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private store: Store) { }

  populateGraph(variables: Variable[], range: number[]): void {
    let graphData: GraphData[] = [];
    for (let i = range[0]; i <= range[1]; i++) {
      graphData.push({x: i, value: this.calculateFunction(variables, i)})
    }
    this.store.dispatch(loadGraphWithData({ graphData }))
  }

  calculateFunction(variables: Variable[], x: number): number {
    let result = 0;
    variables.forEach((v) => {
      result += (v.value * Math.pow(x, v.position));
    })
    return result;
  }
}
