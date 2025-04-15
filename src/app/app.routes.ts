import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } }, //Route for the home page
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule), data: { breadcrumb: 'Shop'} }, //Lazy loading the shop module
    { path: 'test-error', component:TestErrorComponent, data: {breadcrumb: 'Test Error'} }, //Route for testing error handling
    { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } }, //Route for 404 page
    { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } }, //Route for 500 page
    { path: '**', component: PageNotFoundComponent, data: {breadcrumb: 'not-found'} } //Wildcard route for 404 page
];
