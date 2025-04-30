import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from 'uuid';
import { CommonModule } from '@angular/common';
import { ConfirmPassword } from '../../shared/Validators/password.validator';
import { EmailValidator } from '../../shared/Validators/validateEmailNotToken.validate';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private accountService: AccountService, 
    private router: Router, 
    private fb: FormBuilder, 
    private emailValidator:EmailValidator) { }

  errors: string[] = []; //Array to store error messages
  registerForm: FormGroup;
  ngOnInit() {
    this.createRegisterForm(); //Initialize the register form when the component is created
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.emailValidator.ValidateEmailNotToken()]], //Email field with required and email validators
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: [ConfirmPassword] })
  }

  get _displayName() {
    return this.registerForm.get('displayName'); //Get the display name form control
  }
  get _email() {
    return this.registerForm.get('email'); //Get the email form control
  }
  get _password() {
    return this.registerForm.get('password'); //Get the password form control
  }
  get _confirmPassword() {
    return this.registerForm.get('confirmPassword'); //Get the confirm password form control
  }


  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/shop'); //Navigate to the shop page after successful registration
      },
      error: (error) => {
        this.errors = error.errors; //Store the error messages in the errors array
      }
    });
  }
}
