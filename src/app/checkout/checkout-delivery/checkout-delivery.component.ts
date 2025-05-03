import { Component, Input } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from '../../shared/Model/deliveryMethod';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  imports: [CommonModule, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm: FormGroup
  deliveryMethods: IDeliveryMethod[];
  constructor(private checkoutService: CheckoutService,private basketService : BasketService) { }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (response: IDeliveryMethod[]) => {
        this.deliveryMethods = response;
      },
      error: (error) => {
        console.error('Error fetching delivery methods', error);
      }
    });
  }

  setshippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
