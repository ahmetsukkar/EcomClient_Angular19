import { Component } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../Model/basket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-totals',
  imports: [CommonModule],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent {

  basketTotals$:Observable<IBasketTotals>;
  constructor(private basketService: BasketService) { }

  ngOnInit() { 
    this.basketTotals$ = this.basketService.basketTotal$;
  }

}
