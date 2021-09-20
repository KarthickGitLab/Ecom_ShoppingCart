"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Approutes = void 0;
var full_component_1 = require("./layouts/full/full.component");
var blank_component_1 = require("./layouts/blank/blank.component");
var auth_guard_service_1 = require("./shared/auth/auth.guard.service");
var homepage_component_1 = require("./pages/homepage/homepage.component");
var login_component_1 = require("./pages/login/login.component");
var thankyou_component_1 = require("./thankyou/thankyou.component");
var product_builder_component_1 = require("./product-builder/product-builder.component");
var cart_builder_component_1 = require("./cart-builder/cart-builder.component");
exports.Approutes = [
    {
        path: '',
        component: blank_component_1.BlankComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
                path: 'login',
                component: login_component_1.LoginComponent,
            }
        ]
    },
    {
        path: '',
        component: full_component_1.FullComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'home',
                component: homepage_component_1.HomepageComponent,
            }
        ]
    },
    {
        path: '',
        component: blank_component_1.BlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./authentication/authentication.module'); }).then(function (m) { return m.AuthenticationModule; }); }
            }
        ]
    },
    {
        path: '',
        component: full_component_1.FullComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'product-builder',
                component: product_builder_component_1.ProductBuilderComponent,
            }
        ]
    },
    {
        path: '',
        component: full_component_1.FullComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'cart-builder',
                component: cart_builder_component_1.CartBuilderComponent,
            }
        ]
    },
    {
        path: '',
        component: full_component_1.FullComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'thankyou',
                component: thankyou_component_1.ThankyouComponent,
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/authentication/404'
    }
];
//# sourceMappingURL=app-routing.module.js.map