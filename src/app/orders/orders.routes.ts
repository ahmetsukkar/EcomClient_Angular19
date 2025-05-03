import { Route } from "@angular/router";

export const ORDER_ROUTES: Route[] = [
    { path: '', loadComponent: () => import('./orders.component').then(m => m.OrdersComponent) },
    { path: ':id', loadComponent: () => import('./order-details/order-details.component').then(m => m.OrderDetailsComponent),
        data: { breadcrumb: { alias: 'OrderDetails' } } //Route for the order details page
     },
]