import {GraphData, Variable} from "../types/types";
import {AppStateInterface} from "../../types/app.interface";

export const initialVariables: Variable[] = [
  {id: -1, position: 0, value: 1},
  {id: -2, position: 1, value: 1},
  {id: -3, position: 2, value: 1}
];

export const initialRange: number[] = [-100,100];

const initialGraphData = (variables: Variable[], range: number[]): GraphData[] => {
  let graphData: GraphData[] = [];
  for (let i = range[0]; i <= range[1]; i++) {
    graphData.push({x: i, value: calculateFunction(variables, i)})
  }
  return graphData;
}

const calculateFunction = (variables: Variable[], x: number): number => {
  let result = 0;
  variables.forEach((v) => {
    result += (v.value * Math.pow(x, v.position));
  })
  return result;
}

export const initialAppState: AppStateInterface = {
  isLoading: false,
  polynomials: [],
  currentPolynomial: {
    id: -1,
    variables: [ ...initialVariables ],
    rangeStart: initialRange[0],
    rangeEnd: initialRange[1]
  },
  graphData: initialGraphData(initialVariables, initialRange),
  bestSolution: { x:0, value:0 },
  error: null
};
