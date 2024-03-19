import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {DataInputComponent} from "./data-input/data-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {Variable} from "../types/types";
import {VariableButtonsComponent} from "./variable-buttons/variable-buttons.component";

@Component({
  selector: 'app-polynomials',
  standalone: true,
  imports: [
    DataInputComponent,
    MatIcon,
    MatMiniFabButton,
    NgForOf,
    VariableButtonsComponent
  ],
  templateUrl: './polynomials.component.html',
  styleUrl: './polynomials.component.scss'
})
export class PolynomialsComponent {
  initialVariables: Variable[] = [
    {position: 0, value: 0},
    {position: 1, value: 1},
    {position: 2, value: 1}
  ];

  variables: Variable[] = [...this.initialVariables];

  constructor() { }

  onValueChange(newValue: string, index: number) {
    this.variables[index].value = parseFloat(newValue);
  }
}
