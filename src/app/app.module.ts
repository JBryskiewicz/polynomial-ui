import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PolynomialsModule} from "./polynomials/polynomials.module";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PolynomialsModule
  ],
  providers: [],
})
export class AppModule {}
