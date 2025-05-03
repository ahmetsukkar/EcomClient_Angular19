import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl + 'Orders/';
  constructor(private http:HttpClient) { }

  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'get-orders-for-user');
  }

  getOrderDetail(id: string) {
    return this.http.get(this.baseUrl + 'get-order-by-id/' + id);
  }
}
