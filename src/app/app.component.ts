import { Component } from '@angular/core';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcomClient_Angular19';
}
