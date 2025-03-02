import {GraphData, Polynomial} from "../polynomials/types/types";
import {User} from "../users/types/user.interface";

export interface AppStateInterface {
  isLoading: boolean;
  user: User | null;
  polynomials: Polynomial[];
  currentPolynomial: Polynomial;
  graphData: GraphData[];
  bestSolution: GraphData;
  error: string | null;
}
