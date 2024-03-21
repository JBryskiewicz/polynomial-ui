import {createReducer, on} from "@ngrx/store";
import {
  loadFunctionRange,
  loadGraphWithData,
  loadPolynomials,
  loadPolynomialsFailure,
  loadPolynomialsSuccess, loadVariables
} from "./polynomial.actions";
import {initialAppState} from "../polynomials/initialValues/polynomial.initialValues";

export const polynomialReducer = createReducer(
  initialAppState,
  on(loadPolynomials, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(loadPolynomialsSuccess, (state, { polynomials}) => ({
    ...state,
    polynomials: polynomials,
    isLoading: false
  })),
  on(loadPolynomialsFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(loadGraphWithData, (state, { graphData }) => ({
    ...state,
    graphData: graphData
  })),
  on(loadFunctionRange, (state, { range }) => ({
    ...state,
    currentRange: range
  })),
  on(loadVariables, (state, { variables }) => ({
    ...state,
    currentVariables: variables
  })),
)
