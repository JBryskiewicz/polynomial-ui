import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PolynomialEntity} from "../polynomials/types/types";
import {AppStateInterface} from "../types/app.interface";

export const getPolynomialList = createFeatureSelector<AppStateInterface>('polynomial');

export const selectPolynomialList = createSelector(
  getPolynomialList,
  appState => appState.polynomials
);
