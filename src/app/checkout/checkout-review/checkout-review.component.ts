import { Component, Input } from '@angular/core';
import { BasketSummaryComponent } from "../../shared/components/basket-summary/basket-summary.component";
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  imports: [BasketSummaryComponent, CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

  @Input() appStepper:CdkStepper
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit() { }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe({
      next: (basket) => {
        //this.toastr.success('Payment Intent Created Successfully'); 
        this.appStepper.next(); // Move to the next step in the checkout process
      },
      error: (error) => {
        this.toastr.error(error.message, error.statusText);
      }
    });
  }

}
