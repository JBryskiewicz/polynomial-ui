export interface Variable {
  id: number | null;
  position: number;
  value: number;
}

export interface Polynomial {
  id: number | null;
  variables: Variable[];
  rangeStart: number;
  rangeEnd: number;
}

export interface GraphData {
  x: number;
  value: number;
}
