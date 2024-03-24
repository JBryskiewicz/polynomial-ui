import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';
import {GraphData} from "../../types/types";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-function-graph',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard
  ],
  templateUrl: './function-graph.component.html',
  styleUrl: './function-graph.component.scss'
})
export class FunctionGraphComponent implements AfterViewInit, OnChanges {

  @Input() data: GraphData[] = [];
  @Input() bestSolution: GraphData = { x: 0, value:0 }

  constructor() { }

  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateChart();
    }
  }

  private createChart(): void {

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.data.map((xAxis) => xAxis.x),
        datasets: [
          {
            label: 'f(x)',
            data: this.data.map((yAxis) => yAxis.value),
            tension: 0
          },
          {
            label: 'MAX',
            data: [this.bestSolution.value],
            tension: 0,
            pointRadius: 8
          }
        ]
      }
    });
  }

  private updateChart(): void {
    this.chart.data.labels = this.data.map(xAxis => xAxis.x);
    this.chart.data.datasets[0].data = this.data.map(yAxis => yAxis.value);
    this.chart.data.datasets[1].data = this.fillArray(this.bestSolution);
    this.chart.update();
  }

  private fillArray(bestSolution: GraphData): any[] {
    const graphArray: any[] = [];
    for (let i = 1; i < bestSolution.x; i++) {
      graphArray.push(undefined);
    }
    graphArray.push(bestSolution.value);
    return graphArray;
  }

}
