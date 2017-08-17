"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
// import {HomeComponent} from './home/home.component';
// import {AboutComponent} from './about/about.component';
const dashboard_component_1 = require("./dashboard.component");
const login_1 = require("./login");
const details_component_1 = require("./details/details.component");
const appRoutes = [
    // { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'login', component: login_1.Login },
    { path: 'details/:projectId', component: details_component_1.Details },
    { path: '**', redirectTo: '' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
