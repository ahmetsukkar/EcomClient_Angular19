import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./shop.component').then(m => m.ShopComponent) },
  { path: ':id/:name', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopRoutingModule { }
