import {Variable} from "../types/types";
import {AppStateInterface} from "../../types/app.interface";

export const initialAppState: AppStateInterface = {
  isLoading: false,
  polynomials: [],
  error: null
};

export const initialVariables: Variable[] = [
  {position: 0, value: 1},
  {position: 1, value: 1},
  {position: 2, value: 1}
];

export const initialRange: number[] = [0,1];
