import { Route } from "@angular/router";

export const CHECKOUT_ROUTES: Route[] = [
    { path: '', loadComponent: () => import('./checkout.component').then(m => m.CheckoutComponent) },
    { path: 'success', loadComponent: () => import('../shared/components/checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent), }
];