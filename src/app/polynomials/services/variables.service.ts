import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Variable} from "../types/types";
import {loadVariables} from "../../reducers/polynomial.actions";

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private store: Store) { }

  addToCurrentVariables (currentVariables: Variable[]): void {
    const position = currentVariables.length;
    const variables: Variable[] = [
      ...currentVariables,
      {position: position, value: 1}
    ]
    this.store.dispatch(loadVariables({ variables }))
  }

  removeFromCurrentVariables (currentVariables: Variable[]): void {
    if ( currentVariables.length > 3){
      const variables: Variable[] = currentVariables.slice(0, -1);
      this.store.dispatch(loadVariables({ variables }))
    }
  }
}
