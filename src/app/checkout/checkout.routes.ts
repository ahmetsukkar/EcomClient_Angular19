import { Route } from "@angular/router";

export const CHECKOUT_ROUTES: Route[] = [
    {
        path: '', loadComponent: () => import('./checkout.component').then(m => m.CheckoutComponent),
    }
];