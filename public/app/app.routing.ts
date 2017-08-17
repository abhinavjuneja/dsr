import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// import {HomeComponent} from './home/home.component';
// import {AboutComponent} from './about/about.component';
import {DashboardComponent} from './dashboard.component';
import {Login} from './login';
import {Details} from './details/details.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: Login },
    { path: 'details/:projectId', component: Details },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
