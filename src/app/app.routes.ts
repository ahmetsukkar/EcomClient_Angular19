import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }, //Lazy loading the shop module
    { path: '**', component: PageNotFoundComponent } //Wildcard route for 404 page
];
