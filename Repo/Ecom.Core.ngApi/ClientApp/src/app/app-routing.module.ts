import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard }  from './shared/auth/auth.guard.service'; 
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ProductBuilderComponent } from './product-builder/product-builder.component';
import { CartBuilderComponent } from './cart-builder/cart-builder.component';

export const Approutes: Routes = [
    
   
    {
        path: '',
        component: BlankComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                component: LoginComponent,
            }
        ]
    },

    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'home',
                component: HomepageComponent,
            }
        ]
    },
    {
        path: '',
        component: BlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
            }
        ]
    },
{
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'product-builder',
                component: ProductBuilderComponent,
            }
        ]
    },
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'cart-builder',
                component: CartBuilderComponent,
            }
        ]
    },
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [

            {
                path: 'thankyou',
                component: ThankyouComponent,
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/authentication/404'
    }
];
