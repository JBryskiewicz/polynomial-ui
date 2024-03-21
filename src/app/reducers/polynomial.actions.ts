import {createAction, props} from "@ngrx/store";
import {PolynomialEntity} from "../polynomials/types/types";

export const loadPolynomials = createAction('[Polynomials] Load');

export const loadPolynomialsSuccess = createAction(
  '[Polynomials] Load Success',
  props<{ polynomials: PolynomialEntity[] }>()
);

export const loadPolynomialsFailure = createAction(
  '[Polynomials] Load Failure',
    props<{ error: string | null }>()
  );
