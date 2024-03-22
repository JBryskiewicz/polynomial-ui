import {GraphData, Variable} from "../types/types";
import {AppStateInterface} from "../../types/app.interface";

export const initialVariables: Variable[] = [
  {id: null, position: 0, value: 1},
  {id: null, position: 1, value: 1},
  {id: null, position: 2, value: 1}
];

export const initialRange: number[] = [-100,100];

// TODO Change this temporal band aid solution once better idea comes to mind
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
// TODO end of band aid solution

export const initialAppState: AppStateInterface = {
  isLoading: false,
  polynomials: [],
  currentPolynomial: {
    id: null,
    variables: [ ...initialVariables ],
    rangeStart: initialRange[0],
    rangeEnd: initialRange[1]
  },
  graphData: initialGraphData(initialVariables, initialRange),
  error: null
};
