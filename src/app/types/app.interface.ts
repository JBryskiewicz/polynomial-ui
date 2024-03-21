import {GraphData, PolynomialEntity, Variable} from "../polynomials/types/types";

export interface AppStateInterface {
  isLoading: boolean;
  polynomials: PolynomialEntity[];
  currentVariables: Variable[];
  currentRange: number[];
  graphData: GraphData[];
  error: string | null;
}
