import { CdkStepperModule } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../shared/Model/basket';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrder } from '../../shared/Model/order';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var Stripe: any; // Declare Stripe variable
@Component({
  selector: 'app-checkout-payment',
  imports: [CommonModule, CdkStepperModule, ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements AfterViewInit {

  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;

  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  @Input() checkoutForm: FormGroup
  constructor(private checkoutService: CheckoutService, private basketService: BasketService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51LA8WRIComhRpRZ5Ljk4EzZkXMTuMf9OHRExpMH5O25cWFg2Hg96qfK36EntJ747o6wJ2L1e8HRVtsuVA7BXkZZs00JUNt6Jlu'); // Replace with your actual publishable key
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDisDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event) {
    console.log('Event:', event);
    if (event.error) {
      this.cardErrors = event.error.message;
    }
    else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;    
    }
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    if(!basket) throw new Error('This Basket not found!');


    try {
      const createOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      }
      else {
        this.toastr.error('Payment Error: ' + paymentResult.error.message);
      }
      this.loading = false;
    }
    catch (error) {
      console.log('Error:', error);
      this.loading = false;
    }

    // this.checkoutService.CreateOrder(orderToCreate).subscribe({
    //   next: (order: IOrder) => {
    //     //this.toastr.success('Order created successfully!');
    //     this.stripe.confirmCardPayment(basket.clientSecret, {
    //       payment_method: {
    //         card: this.cardNumber,
    //         billing_details: {
    //           name: this.checkoutForm.get('paymentForm.nameOnCard').value
    //         }
    //       }
    //     }).then((result) => {
    //       console.log('Strip Pyment Result: ', result);
    //       if (result.paymentIntent) {
    //         this.basketService.deleteLocalBasket(basket.id);
    //         const navigationExtras: NavigationExtras = { state: order };
    //         this.router.navigate(['checkout/success'], navigationExtras);
    //       }
    //       else {
    //         this.toastr.error('Payment Error: ' + result.error.message);
    //       }
    //     })

    //   }
    //   , error: (error) => {
    //     this.toastr.error('Error creating order!', error);
    //   }
    // });

  }
  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm.nameOnCard').value
        }
      }
    })
  }

  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.CreateOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm.deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    }
  }
}
