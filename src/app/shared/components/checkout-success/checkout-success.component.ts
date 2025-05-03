import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IOrder } from '../../Model/order';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout-success',
  imports: [NgIf, RouterModule],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent {

  order: IOrder;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit() {

  }

}
