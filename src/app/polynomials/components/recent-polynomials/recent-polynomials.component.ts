import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Polynomial} from "../../types/types";
import {PolynomialService} from "../../services/polynomial.service";

@Component({
  selector: 'app-recent-polynomials',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        NgForOf
    ],
  templateUrl: './recent-polynomials.component.html',
  styleUrl: './recent-polynomials.component.scss'
})
export class RecentPolynomialsComponent {

  @Input() polynomials: Polynomial[] = [];

  constructor(private polyService: PolynomialService) { }
  polynomialDelete(id: number){
    this.polyService.deletePolynomial(id);
  }
}
