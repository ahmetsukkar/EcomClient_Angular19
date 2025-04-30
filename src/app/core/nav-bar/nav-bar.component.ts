import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IBasket } from '../../shared/Model/basket';
import { AccountService } from '../../account/account.service';
import { IUser } from '../../shared/Model/user';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule, BsDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private basketService: BasketService, private accountService: AccountService) { }

  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>; //Observable for the current user

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$; //Get the current user from the account service
  }

  logout(){
    this.accountService.logout(); //Call the logout method from the account service
  }

}
