import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,FormGroup } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';


import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {DashboardComponent} from './dashboard.component';

import {Details} from './details/details.component';
import {Login} from './login';

import { DialogLaunch } from './services/dialog';
import { DialogLaunch1 } from './addScript/dialog';
import { Auth } from './services/auth';
// import {DialogOverviewExample,DialogOverviewExampleDialog} from './toBeDel/dialog';
import {Projects} from './services/projects';
import 'node_modules/hammerjs/hammer.js';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        Details,
        Login,
        DialogLaunch,
        DialogLaunch1
    ],
    imports: [
        BrowserModule,
        routing,
        MaterialModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    providers: [
        appRoutingProviders,
        BaseRequestOptions,
        Auth,
        Projects,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogLaunch,
        DialogLaunch1
    ]

})

export class AppModule {
}
