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

import { Auth } from './services/auth';
import {DialogLaunch} from './services/dialog';
import {Projects} from './services/projects';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        Details,
        DialogLaunch,
        Login
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
        DialogLaunch,
        Projects
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogLaunch
    ]

})

export class AppModule {
}
