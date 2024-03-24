import {createReducer, on} from "@ngrx/store";
import {
  loadBestSolution,
  loadCurrentPolynomial,
  loadFunctionRange,
  loadGraphWithData,
  loadPolynomials,
  loadPolynomialsFailure,
  loadPolynomialsSuccess,
  loadVariables,
  reloadPolynomialsWithCurrentPolySuccess,
  RESET_POLYNOMIAL
} from "./polynomial.actions";
import {initialAppState} from "../polynomials/initialValues/polynomial.initialValues";

export const polynomialReducer = createReducer(
  initialAppState,
  on(loadPolynomials, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(loadPolynomialsSuccess, (state, {polynomials}) => ({
    ...state,
    polynomials: polynomials,
    isLoading: false
  })),
  on(loadPolynomialsFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(reloadPolynomialsWithCurrentPolySuccess, (state, { polynomials }) => {
    const currentPolynomial = (polynomials.length !== 0) ? polynomials[0] : initialAppState.currentPolynomial;
    const nextState = {
      ...state,
      polynomials: polynomials,
      currentPolynomial: currentPolynomial,
      isLoading: false
    }
      return nextState
    }),
  on(loadGraphWithData, (state, {graphData}) => ({
    ...state,
    graphData: graphData
  })),
  on(loadCurrentPolynomial, (state, {polynomial}) => ({
    ...state,
    currentPolynomial: polynomial
  })),
  on(loadFunctionRange, (state, {range}) => ({
    ...state,
    currentPolynomial: {
      id: state.currentPolynomial.id,
      variables: state.currentPolynomial.variables,
      rangeStart: range[0],
      rangeEnd: range[1]
    }
  })),
  on(loadVariables, (state, {variables}) => ({
    ...state,
    currentPolynomial: {
      id: state.currentPolynomial.id,
      variables: variables,
      rangeStart: state.currentPolynomial.rangeStart,
      rangeEnd: state.currentPolynomial.rangeEnd,
    }
  })),
  on(loadBestSolution, (state, {bestSolution}) => ({
    ...state,
    bestSolution: bestSolution
  })),
  on(RESET_POLYNOMIAL, (state) => ({
    ...state,
    currentPolynomial: initialAppState.currentPolynomial
  }))
)
