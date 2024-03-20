import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {DataInputComponent} from "./data-input/data-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {FunctionRange, PolynomialEntity, Variable} from "../types/types";
import {VariableButtonsComponent} from "./variable-buttons/variable-buttons.component";
import {PolynomialService} from "../services/polynomial.service";
import {RangeInputComponent} from "./range-input/range-input.component";

@Component({
  selector: 'app-polynomials',
  standalone: true,
  imports: [
    DataInputComponent,
    MatIcon,
    MatMiniFabButton,
    NgForOf,
    VariableButtonsComponent,
    RangeInputComponent
  ],
  templateUrl: './polynomials.component.html',
  styleUrl: './polynomials.component.scss'
})
export class PolynomialsComponent implements OnInit {
  initialVariables: Variable[] = [
    {position: 0, value: 1},
    {position: 1, value: 1},
    {position: 2, value: 1}
  ];

  initialRange: number[] = [0,0];

  range: number[] = [ ...this.initialRange ];
  variables: Variable[] = [ ...this.initialVariables ];
  polynomials: PolynomialEntity[] = [];

  constructor(private polyService: PolynomialService) {
  }

  ngOnInit(): void {
      this.polyService.getAllPolynomials()
        .subscribe((polynomials) => this.polynomials = polynomials);
  }

  onVariableChange(newValue: string, index: number) {
    this.variables[index].value = parseFloat(newValue);
  }

  onRangeChange(newValue: string, index: number) {
    this.range[index] = parseFloat(newValue);
    console.log(this.range)
  }

  polynomialDelete(id: number){
    this.polyService.deletePolynomial(id);
  }
}
