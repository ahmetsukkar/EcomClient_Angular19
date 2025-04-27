import { Route } from "@angular/router";

export const SHOP_ROUTES: Route[] = [
    { path: '', loadComponent: () => import('./shop.component').then(m => m.ShopComponent), data: { breadcrumb: 'Shop' } }, //Route for the shop page
    {
        path: ':id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent),
        data: { breadcrumb: { alias: "productDetails" } }
    },
]