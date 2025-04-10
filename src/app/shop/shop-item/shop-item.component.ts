import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Model/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-item',
  imports: [CommonModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {

  @Input() product: IProduct;
}
