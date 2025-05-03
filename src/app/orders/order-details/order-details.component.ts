import { Component } from '@angular/core';
import { OrdersService } from '../orders.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IOrder } from '../../shared/Model/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

  constructor(private orderService: OrdersService, private breadcrumbService: BreadcrumbService, private router: ActivatedRoute) {
    this.breadcrumbService.set('@OrderDetails', '');
  }

  order: IOrder;

  ngOnInit() {
    const orderId = this.router.snapshot.paramMap.get('id');
    this.orderService.getOrderDetail(orderId).subscribe({
      next: (order: IOrder) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetails', `Order# ${order.id.slice(0, 8)}`);
      },
      error: (error) => {
        console.error('Error fetching order details', error.message);
      }
    });
  }
}
