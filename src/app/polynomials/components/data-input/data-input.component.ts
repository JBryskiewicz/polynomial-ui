import {Component, Input, } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Variable} from "../../types/types";
import {VariablesService} from "../../services/variables.service";

@Component({
  selector: 'app-data-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.scss'
})
export class DataInputComponent {

  @Input() variable: Variable = {position: 0, value: 0};

  constructor(private varService: VariablesService) {
  }

  onInputChange(event: any) {
    this.varService.updateVariable(
      this.variable.position,
      parseFloat(event.target.value)
    )
  }

}
