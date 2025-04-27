import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { SHOP_ROUTES } from './shop/shop.routes';
import { BASKET_ROUTES } from './basket/basket.routes';
import { CHECKOUT_ROUTES } from './checkout/checkout.routes';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } }, //Route for the home page
    { path: 'shop', children: SHOP_ROUTES}, //Lazy loading the shop module
    { path: 'basket', children: BASKET_ROUTES}, //Lazy loading the shop module
    { path: 'checkout', children: CHECKOUT_ROUTES, data: { breadcrumb: 'Checkout' } }, //Lazy loading the checkout module
    { path: 'test-error', component:TestErrorComponent, data: {breadcrumb: 'Test Error'} }, //Route for testing error handling
    { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } }, //Route for 404 page
    { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } }, //Route for 500 page
    { path: '**', component: PageNotFoundComponent, data: {breadcrumb: 'not-found'} } //Wildcard route for 404 page
];
