import { Route } from "@angular/router";

export const BASKET_ROUTES: Route[] = [
    {
        path: '', loadComponent: () => import('./basket.component').then(m => m.BasketComponent),
        data: { breadcrumb: 'Basket' }
    }, //Route for the basket page
]