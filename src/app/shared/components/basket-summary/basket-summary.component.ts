import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../Model/basket';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket-summary',
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss'
})
export class BasketSummaryComponent {

  basket$: Observable<IBasket>
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket: boolean = true;
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

  decrementBasketItem(item: IBasketItem) {
    this.decrement.emit(item);
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }



}
