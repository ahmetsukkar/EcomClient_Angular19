import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from '../../shared/Model/address';

@Component({
  selector: 'app-checkout-address',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CdkStepperModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService, private toaster: ToastrService) { }


  ngOnInit() {
  }

  get _firstName() {
    return this.checkoutForm.get('addressForm.firstName');
  }

  get _lastName() {
    return this.checkoutForm.get('addressForm.lastName');
  }

  get _street() {
    return this.checkoutForm.get('addressForm.street');
  }

  get _city() {
    return this.checkoutForm.get('addressForm.city');
  }

  get _state() {
    return this.checkoutForm.get('addressForm.state');
  }

  get _zipCode() {
    return this.checkoutForm.get('addressForm.zipCode');
  }
  

  saveUserAddress() {
    var _currentAddress = this.checkoutForm.get('addressForm').value;
    this.accountService.updateUserAddress(_currentAddress).subscribe({
      next: (address:IAddress) => {
        this.toaster.success('Address updated successfully!');
        this.checkoutForm.get('addressForm').reset(address); // Reset the form with the updated address
      },
      error: (error) => {
        this.toaster.error('Error updating address!', error);
      }
    });

  }

}
