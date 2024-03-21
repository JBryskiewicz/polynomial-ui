import {Component, Input} from '@angular/core';
import {Variable, Polynomial} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {PolynomialService} from "../../services/polynomial.service";

@Component({
  selector: 'app-variable-buttons',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './variable-buttons.component.html',
  styleUrl: './variable-buttons.component.scss'
})
export class VariableButtonsComponent {
  @Input() variables: Variable[] = [];
  @Input() range: number[] = [];

  constructor(private polyService: PolynomialService) { }

  saveToDataBase() {
    const polynomial: Polynomial = {
      variables: this.variables,
      rangeStart: this.range[0],
      rangeEnd: this.range[1]
    }
    this.polyService.savePolynomial(polynomial);
  }

  addVariable(): void  {
    this.variables.push({position: this.variables.length, value: 1})
  }

  removeVariable(): void {
    if (this.variables.length > 3) this.variables.pop();
  }

}
