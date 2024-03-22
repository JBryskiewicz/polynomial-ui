import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {take} from "rxjs";
import {selectCurrentRange} from "../../reducers/polynomial.selectors";
import {loadFunctionRange} from "../../reducers/polynomial.actions";

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  constructor(private store: Store) { }

  updateFunctionRange(rangeNumber: number, index: number): void {
    this.store.select(selectCurrentRange)
      .pipe(take(1))
      .subscribe(data => {
      let range: number[] = [...data];
      range[index] = rangeNumber;
      this.store.dispatch(loadFunctionRange({range}));
    });
  }
}
