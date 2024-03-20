import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-range-input',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel
    ],
  templateUrl: './range-input.component.html',
  styleUrl: './range-input.component.scss'
})
export class RangeInputComponent {

  @Input () index: number = 0;
  @Input() range: number = 0;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  // TODO proper validation for not a number values
  onInputChange(event: any){
    if(parseFloat(event.target.value) !== 0){
      this.valueChange.emit(event.target.value);
    } else {
      console.log("variable cannot be 0")
    }
  }
}
