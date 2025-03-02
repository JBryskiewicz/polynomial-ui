import { Routes } from '@angular/router';
import {UserScreenComponent} from "./users/components/user-screen.component";
import {PolynomialsComponent} from "./polynomials/components/polynomials.component";

export const routes: Routes = [
  { path: '', component: UserScreenComponent }, // Default route
  { path: 'loggedIn', component: PolynomialsComponent }, // Navigates to AboutComponent
];
