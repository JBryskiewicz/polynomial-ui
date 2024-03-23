export interface NewVariable {
  position: number;
  value: number;
}

export interface Variable extends NewVariable{
  id: number;
}

export interface NewPolynomial {
  variables: NewVariable[];
  rangeStart: number;
  rangeEnd: number;
}

export interface Polynomial{
  id: number;
  variables: Variable[];
  rangeStart: number;
  rangeEnd: number;
}

export interface GraphData {
  x: number;
  value: number;
}
