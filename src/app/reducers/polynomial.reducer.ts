import {createReducer, on} from "@ngrx/store";
import {
  loadCurrentPolynomial,
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
  on(loadCurrentPolynomial, (state, { polynomial }) => ({
    ...state,
    currentPolynomial: polynomial
  })),
  on(loadFunctionRange, (state, { range }) => ({
    ...state,
    currentPolynomial: {
      id: state.currentPolynomial.id,
      variables: state.currentPolynomial.variables,
      rangeStart: range[0],
      rangeEnd: range[1]
    }
  })),
  on(loadVariables, (state, { variables }) => ({
    ...state,
    currentPolynomial: {
      id: state.currentPolynomial.id,
      variables: variables,
      rangeStart: state.currentPolynomial.rangeStart,
      rangeEnd: state.currentPolynomial.rangeEnd,
    }
  })),
)
