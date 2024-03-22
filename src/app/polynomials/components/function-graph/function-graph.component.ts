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
          }
        ]
      }
    });
  }

  private updateChart(): void {
    this.chart.data.labels = this.data.map(xAxis => xAxis.x);
    this.chart.data.datasets[0].data = this.data.map(yAxis => yAxis.value);
    this.chart.update();
  }

}
