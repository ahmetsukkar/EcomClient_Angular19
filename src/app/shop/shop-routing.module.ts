import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./shop.component').then(m => m.ShopComponent), data: { breadcrumb: 'Shop' } }, //Route for the shop page
  { path: ':id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent), 
    data: { breadcrumb: { alias: "productDetails" } } },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopRoutingModule { }
