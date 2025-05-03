import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../shared/Model/basket';
import { FormGroup } from '@angular/forms';
import { IOrder } from '../../shared/Model/order';
import { Navigation, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  imports: [CdkStepperModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {

  @Input() checkoutForm: FormGroup;
  constructor(private checkoutService: CheckoutService, private basketService: BasketService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    console.log('orderToCreate:', orderToCreate);
    this.checkoutService.CreateOrder(orderToCreate).subscribe({
      next: (order: IOrder) => {
        this.toastr.success('Order created successfully!');
        this.basketService.deleteLocalBasket(basket.id);
        //this.router.navigate(['/checkout/success'], { queryParams: { orderId: order.id } });
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      }
      , error: (error) => {
        this.toastr.error('Error creating order!', error);
      }
    });
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    }
  }
}
