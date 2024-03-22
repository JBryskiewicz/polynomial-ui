import {GraphData, Polynomial, Variable} from "../polynomials/types/types";

export interface AppStateInterface {
  isLoading: boolean;
  polynomials: Polynomial[];
  currentVariables: Variable[];
  currentRange: number[];
  graphData: GraphData[];
  error: string | null;
}
