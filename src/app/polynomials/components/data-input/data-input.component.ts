import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Variable} from "../../types/types";
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
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  // TODO validation for not a number values
  onInputChange(event: any){
    if(event.target.value !== 0){
      this.valueChange.emit(event.target.value);
    } else {
      console.log("variable cannot be 0")
    }
  }
}
