import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/Model/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/Model/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl + 'Orders/';
  constructor(private http: HttpClient) { }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'get-delivery-methods')
      .pipe(
        map((response: IDeliveryMethod[]) => {
          return response.sort((a, b) => a.price - b.price);
        })
      );
  }

  CreateOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'create-order', order);
  }

}
