import {AfterViewInit, Component, Input} from '@angular/core';
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
export class FunctionGraphComponent implements AfterViewInit {

  @Input() data: GraphData[] = [];

  constructor() { }

  chart: any;

  ngAfterViewInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.data.map((row) => row.x),
        datasets: [
          {
            label: 'f(x)',
            data: this.data.map((row) => row.value),
            tension: 0
          }
        ]
      }
    });
  }
}
