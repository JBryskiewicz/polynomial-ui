import {createReducer, on} from "@ngrx/store";
import {loadPolynomials, loadPolynomialsFailure, loadPolynomialsSuccess} from "./polynomial.actions";
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
  }))
)
