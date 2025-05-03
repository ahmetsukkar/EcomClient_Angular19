import { Component } from '@angular/core';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";
import { StepperComponent } from "../shared/components/stepper/stepper.component";
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from "./checkout-address/checkout-address.component";
import { CheckoutDeliveryComponent } from "./checkout-delivery/checkout-delivery.component";
import { CheckoutPaymentComponent } from "./checkout-payment/checkout-payment.component";
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  imports: [OrderTotalsComponent, CdkStepperModule, StepperComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent {

  checkoutForm: FormGroup
  constructor(private fb: FormBuilder, private accountService: AccountService) { 
    // Initialize any necessary properties or services here
  }

  ngOnInit() {
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', [Validators.required]]
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['', [Validators.required]],
        cardNumber: ['', [Validators.required]],
        expirationDate: ['', [Validators.required]],
        cvv: ['', [Validators.required]]
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        console.log('Address:', address);
        this.checkoutForm.get('addressForm').patchValue(address)

        // this.checkoutForm.get('addressForm.firstName').setValue(address.firstName);
        // this.checkoutForm.get('addressForm.lastName').setValue(address.lastName);
        // this.checkoutForm.get('addressForm.street').setValue(address.street);
        // this.checkoutForm.get('addressForm.city').setValue(address.city);
        // this.checkoutForm.get('addressForm.state').setValue(address.state);
        // this.checkoutForm.get('addressForm.zipCode').setValue(address.zipCode);
      },
      error: (error) => {
        console.error('Error fetching user address', error);
      }
    });
  }


}
