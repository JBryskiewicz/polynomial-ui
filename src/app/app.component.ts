import {Component} from '@angular/core';
import {PolynomialsComponent} from "./polynomials/components/polynomials.component";
import {UserScreenComponent} from "./users/components/user-screen.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  styleUrl: './app.component.scss',
  imports: [PolynomialsComponent, UserScreenComponent, RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent { }
