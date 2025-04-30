import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup
  returnUrl: string;
  constructor(private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { } //Constructor for the LoginComponent class


  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], //Email field with required and email validators
      password: ['', Validators.required], //Password field with required validator
    });
  }
  س
  get _email() {
    return this.loginForm.get('email'); //Get the email form control
  }
  get _password() {
    return this.loginForm.get('password'); //Get the password form control
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'; //Get the return URL from the query parameters or set it to '/shop' by default
    this.createLoginForm(); //Initialize the login form when the component is created
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.router.navigateByUrl(this.returnUrl); //Navigate to the return URL after successful login
        },
        error: (error) => {
          console.error('Login failed', error); //Log an error message if the login fails
        }
      }
      );
    } else {
      console.log('Form is invalid'); //Log a message if the form is invalid
    }
  }
}
