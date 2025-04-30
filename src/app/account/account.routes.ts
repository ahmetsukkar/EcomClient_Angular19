import { Route } from "@angular/router";
import { AccountComponent } from "./account.component";

export const ACCOUNT_ROUTES: Route[] = [
    { path: "login", loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) }, //Route for the login page
    { path: "register", loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) }, //Route for the register page 
]