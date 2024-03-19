import {Component, Input} from '@angular/core';
import {Variable} from "../../types/types";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";

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

  addVariable(): void  {
    this.variables.push({position: this.variables.length, value: 1})
    console.log(this.variables)
  }

  removeVariable(): void {
    if (this.variables.length > 3) {
      this.variables.pop();
    }
  }
}
