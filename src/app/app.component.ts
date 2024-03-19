import {Component} from '@angular/core';
import {PolynomialsComponent} from "./polynomials/components/polynomials.component";

@Component({
  selector: 'app-root',
  styleUrl: './app.component.scss',
  imports: [PolynomialsComponent],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent { }
