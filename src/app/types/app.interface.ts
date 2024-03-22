import {GraphData, Polynomial} from "../polynomials/types/types";

export interface AppStateInterface {
  isLoading: boolean;
  polynomials: Polynomial[];
  currentPolynomial: Polynomial;
  graphData: GraphData[];
  error: string | null;
}
