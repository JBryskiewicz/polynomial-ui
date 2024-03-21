export interface Variable {
  position: number;
  value: number;
}

export interface VariableEntity extends Variable{
  id: number;
}

export interface Polynomial {
  variables: Variable[];
  rangeStart: number;
  rangeEnd: number;
}

export interface PolynomialEntity {
  id: number;
  variables: VariableEntity[];
  rangeStart: number;
  rangeEnd: number;
}

export interface GraphData {
  x: number;
  value: number;
}
