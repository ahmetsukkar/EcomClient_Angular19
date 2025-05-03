import { Component } from '@angular/core';
import { IOrder } from '../shared/Model/order';
import { OrdersService } from './orders.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule,RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: IOrder[];

  constructor(private orderService: OrdersService) { }


  ngOnInit() { 
    this.getOrders();

  }

  // getOrders() {
  //   this.orderService.getOrdersForUser().subscribe((orders: IOrder[]) => {
  //     this.order = orders; // Assuming you want the first order for demonstration
  //   });
  // }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe({
      next: (orders: IOrder[]) => {
        this.orders = orders; // Assuming you want the first order for demonstration
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }

}
