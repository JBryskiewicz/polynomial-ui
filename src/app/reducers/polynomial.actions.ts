import {createAction, props} from "@ngrx/store";
import {GraphData, PolynomialEntity, Variable} from "../polynomials/types/types";

export const loadPolynomials = createAction('[Polynomials] Load');

export const loadPolynomialsSuccess = createAction(
  '[Polynomials] Load Success',
  props<{ polynomials: PolynomialEntity[] }>()
);

export const loadPolynomialsFailure = createAction(
  '[Polynomials] Load Failure',
    props<{ error: string | null }>()
  );

export const loadGraphWithData = createAction(
  '[GraphData] Data Loaded',
  props<{ graphData: GraphData[]}>()
);

export const loadFunctionRange = createAction(
  '[Range] Range Loaded',
  props<{ range: number[] }>()
);

export const loadVariables = createAction(
  '[Variables] Variables Loaded',
  props<{ variables: Variable[] }>()
)
