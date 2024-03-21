import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {PolynomialsComponent} from "./components/polynomials.component";

@NgModule({
  imports: [
    CommonModule,
    PolynomialsComponent
  ],
  exports: [PolynomialsComponent],
  providers: [],
})
export class PolynomialsModule {}
