import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class FunctionGraphComponent implements OnInit {

  @Input() data: GraphData[] = [];
  constructor() { }

  chart: any;

  // Hardcoded for preview
  initData: GraphData[] = [
    {x: -2, value: 100},
    {x: -1.5, value: 10},
    {x: -1, value: 0},
    {x: 0, value: -5},
    {x: 1, value: 0},
    {x: 1.5, value: 10},
    {x: 2, value: 100}
  ]

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.initData.map((row) => row.x),
        datasets: [
          {
            label: 'f(x)',
            data: this.initData.map((row) => row.value),
            tension: 0
          }
        ]
      }
    });
  }
}
