import { Component } from '@angular/core';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, RouterOutlet, SectionHeaderComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcomClient_Angular19';

  constructor(private basketService: BasketService, private accountService: AccountService) { } //Constructor for the AppComponent class

  ngOnInit() {
    this.loadBasket(); //Load the basket when the component is initialized
    this.loadcurrentUser(); //Load the current user when the component is initialized
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => { console.log('Basket loaded successfully'); },
        error: (error) => { console.error('Error loading basket', error); }
      });
    } else {
      console.log('No basket ID found in local storage'); //Log a message if no basket ID is found
    }
  }

  loadcurrentUser() {
    const token = localStorage.getItem('token'); //Get the token from local storage
    //if (token) {
    this.accountService.loadCurrentUser(token).subscribe({
      next: () => { console.log('User loaded successfully'); },
      error: (error) => { console.error('Error loading user', error); }
    });
    //}
  }
}
