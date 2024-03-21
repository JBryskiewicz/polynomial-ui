import {Injectable} from "@angular/core";
import {GraphData, Variable} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  populateGraph(variables: Variable[], range: number[]): GraphData[] {
    let data: GraphData[] = [];
    for (let i = range[0]; i <= range[1]; i++) {
      data.push({x: i, value: this.calculateFunction(variables, i)})
    }
    return data;
  }

  calculateFunction(variables: Variable[], x: number): number {
    let result = 0;
    variables.forEach((v) => {
      result += (v.value * Math.pow(x, v.position));
    })
    return result;
  }
}
