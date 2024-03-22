import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RangeService} from "../../services/range.service";

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

  @Input() index: number = 0;
  @Input() range: number = 0;

  constructor(private rangeService: RangeService) { }

  onInputChange(event: any) {
    this.rangeService.updateFunctionRange(
      parseFloat(event.target.value),
      this.index
    );
  }
}
