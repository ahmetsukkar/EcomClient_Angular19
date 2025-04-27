import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Model/basket';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";

@Component({
  selector: 'app-basket',
  imports: [CommonModule, RouterLink, OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  basket$ : Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit() { 
    this.basket$ = this.basketService.basket$;
    console.log('Basket:', this.basket$);
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    this.basketService.increaseBasketItemQuantity(item);
  }

  decrementBasketItem(item: IBasketItem) {
    this.basketService.decreamentBasketItem(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeBasketItem(item);
  } 

}
