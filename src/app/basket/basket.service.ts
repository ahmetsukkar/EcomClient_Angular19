import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/Model/Product';
import { IBasket, IBasketItem, Basket, IBasketTotals } from '../shared/Model/basket';
import { IDeliveryMethod } from '../shared/Model/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl + 'baskets';
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  shipping:number = 0;

  constructor(private http: HttpClient) { }

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  createPaymentIntent() {
    return this.http.post(environment.apiUrl + 'Payments/' + this.getCurrentBasketValue().id,{})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          console.log(this.getCurrentBasketValue());
        })
      )
  }


  setShippingPrice(deliveryMethod:IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }


  increaseBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const indexItem = basket.basketItems.findIndex(i => i.id === item.id);
    basket.basketItems[indexItem].quantity += 1;
    this.setBasket(basket);
  }

  decreamentBasketItem(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const indexItem = basket.basketItems.findIndex(i => i.id === item.id);

    if (basket.basketItems[indexItem].quantity > 1) {
      basket.basketItems[indexItem].quantity -= 1;
      this.setBasket(basket);
    } else {
      this.removeBasketItem(item);
    }

  }

  removeBasketItem(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some(i => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter(i => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteLocalBasket(id:string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + '/delete-basket/' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.basketItems.reduce((a, b) => {
      return a + (b.price * b.quantity);
    }, 0)
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, subtotal, total });
    console.log('Emitting totals:', { shipping, subtotal, total });
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + '/get-basket-items-by-basketId/' + id)
      .pipe(
        map((basketResult: IBasket) => {
          console.log('getBasket service called:');
          this.basketSource.next(basketResult);
          this.shipping = basketResult.shippingPrice;
          this.calculateTotals();
          //console.log(this.getCurrentBasketValue());
        })
      )
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + '/update-basket', basket).subscribe({
      next: (response: IBasket) => {
        console.log('setBasket service called:');
        this.basketSource.next(response);
        this.calculateTotals();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd);
    return this.setBasket(basket);
  }

  private addOrUpdateItem(basketItems: IBasketItem[], itemToAdd: IBasketItem): IBasketItem[] {
    const index = basketItems.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = itemToAdd.quantity;
      basketItems.push(itemToAdd);
    }
    else {
      basketItems[index].quantity += itemToAdd.quantity;
    }
    return basketItems;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      productPicture: item.picture,
      quantity,
      category: item.categoryName,
    };
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

}
