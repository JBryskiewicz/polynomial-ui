import {Injectable} from "@angular/core";
import {FunctionService} from "./function.service";
import {Store} from "@ngrx/store";
import {GraphData, Variable} from "../types/types";
import {loadBestSolution} from "../../reducers/polynomial.actions";

@Injectable({
  providedIn: 'root'
})
export class AnnealingService {

  constructor(private functionService: FunctionService, private store: Store) {
  }

  calculateAnnealing(variables: Variable[], range: number[]) {
    let searchRange: [number, number] = [range[0], range[1]];
    const coolingRate: number = 0.5;
    const maxIterations: number = 100;
    const testsPerIteration: number = 3;

    let temperature: number = 1;

    let localMax: number = searchRange[0] + (Math.random() * (searchRange[1] - searchRange[0])); //x
    let value: number = 0;

    for (let i = 0; i < maxIterations; i++) {
    let fX: number = this.functionService.calculateFunction(variables, localMax);
      searchRange = [
        Math.max(searchRange[0], localMax - 2 * temperature),
        Math.min(searchRange[1], localMax + 2 * temperature)
      ];

      for (let j = 0; j < testsPerIteration; j++) {
        let newX: number = searchRange[0] + (Math.random() * (searchRange[1] - searchRange[0]));
        let newfX: number = this.functionService.calculateFunction(variables, newX);

        if (newfX > fX || Math.exp((newfX - fX) / temperature) > Math.random()) {
          fX = newfX;
          value = fX;
          localMax = newX;
        }
      }
      temperature *= coolingRate;
    }

    const bestSolution: GraphData = {x: localMax, value: value}

    this.store.dispatch(loadBestSolution({ bestSolution }));
  }
}
