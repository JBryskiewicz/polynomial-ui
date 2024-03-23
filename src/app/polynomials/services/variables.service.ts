import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Variable} from "../types/types";
import {loadVariables} from "../../reducers/polynomial.actions";
import {selectCurrentVariables} from "../../reducers/polynomial.selectors";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private store: Store,) { }

  addToCurrentVariables(currentVariables: Variable[]): void {
    const position = currentVariables.length;
    const variables: Variable[] = [
      ...currentVariables,
      {id: (-1)*position-1 ,position: position, value: 1}
    ]
    this.store.dispatch(loadVariables({variables}))
  }

  removeFromCurrentVariables(currentVariables: Variable[]): void {
    if (currentVariables.length > 3) {
      const variables: Variable[] = currentVariables.slice(0, -1);
      this.store.dispatch(loadVariables({variables}))
    }
  }

  updateVariable(position: number, value: number): void {
    this.store.select(selectCurrentVariables)
      .pipe(take(1))
      .subscribe(data => {
        let variables: Variable[] = [...data];
        if (value !== 0 && !Number.isNaN(value)) {
          //expected error?
          variables[position] = {id: variables[position].id, position: position, value: value}
        } else {
          variables[position] = {id: variables[position].id, position: position, value: 1};
        }
        this.store.dispatch(loadVariables({variables}))
      })
  }
}
