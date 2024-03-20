export interface Variable {
  position: number;
  value: number;
}

export interface VariableEntity extends Variable{
  id: number;
}

export interface Polynomial {
  variables: Variable[];
}

export interface PolynomialEntity {
  id: number;
  variables: VariableEntity[];
}

export interface FunctionRange {
  start: number;
  end: number;
}
