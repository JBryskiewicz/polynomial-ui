import {PolynomialEntity} from "../polynomials/types/types";

export interface AppStateInterface {
  isLoading: boolean;
  polynomials: PolynomialEntity[];
  error: string | null;
}
