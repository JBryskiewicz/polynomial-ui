export interface Variable {
  id?: number;
  position: number;
  value: number;
}

export interface Polynomial {
  id?: number;
  variables: Variable[];
}
