import { Component } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Model/Product';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  product: IProduct;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ')
   }

  ngOnInit() {
    this.LoadProductDetails();
  }

  LoadProductDetails() {
    var routeProductId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => { routeProductId = params['id'] });
    this.shopService.getProductById(routeProductId).subscribe(response => {
      this.product = response;
      this.bcService.set('@productDetails', response.name); // set the breadcrumb title
    });
  }

}
