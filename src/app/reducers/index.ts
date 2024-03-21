import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {polynomialReducer} from "./polynomial.reducer";

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  polynomial: polynomialReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
