import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }, //Lazy loading the shop module
    { path: 'test-error', component:TestErrorComponent }, //Route for testing error handling
    { path: 'not-found', component: NotFoundComponent},
    { path: 'server-error', component: ServerErrorComponent},
    { path: '**', component: PageNotFoundComponent } //Wildcard route for 404 page
];
