import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { IBasket } from '../../shared/Model/basket';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private basketService: BasketService) { }

  basket$: Observable<IBasket>;

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

}
