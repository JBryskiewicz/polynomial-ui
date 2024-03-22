import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../types/app.interface";

export const getPolynomialList = createFeatureSelector<AppStateInterface>('polynomial');

export const selectPolynomialList = createSelector(
  getPolynomialList,
  appState => appState.polynomials
);

export const getGraphData = createFeatureSelector<AppStateInterface>('polynomial');

export const selectGraphData = createSelector(
  getGraphData,
  appState => appState.graphData
);

export const getCurrentRange = createFeatureSelector<AppStateInterface>('polynomial');

export const selectCurrentRange = createSelector(
  getCurrentRange,
  appState => {
    return [appState.currentPolynomial.rangeStart, appState.currentPolynomial.rangeEnd]
  }
);

export const getCurrentVariables = createFeatureSelector<AppStateInterface>('polynomial');

export const selectCurrentVariables = createSelector(
  getCurrentVariables,
  appState => appState.currentPolynomial.variables
);

export const getCurrentPolynomial = createFeatureSelector<AppStateInterface>('polynomial');

export const selectCurrentPolynomial = createSelector(
  getCurrentPolynomial,
  appState => appState.currentPolynomial
);
