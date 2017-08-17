"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const material_1 = require("@angular/material");
const animations_1 = require("@angular/platform-browser/animations");
const flex_layout_1 = require("@angular/flex-layout");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const dashboard_component_1 = require("./dashboard.component");
const details_component_1 = require("./details/details.component");
const login_1 = require("./login");
const auth_1 = require("./services/auth");
const dialog_1 = require("./services/dialog");
const projects_1 = require("./services/projects");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            details_component_1.Details,
            dialog_1.DialogLaunch,
            login_1.Login
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_1.routing,
            material_1.MaterialModule,
            animations_1.BrowserAnimationsModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            flex_layout_1.FlexLayoutModule
        ],
        providers: [
            app_routing_1.appRoutingProviders,
            http_2.BaseRequestOptions,
            auth_1.Auth,
            dialog_1.DialogLaunch,
            projects_1.Projects
        ],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [
            dialog_1.DialogLaunch
        ]
    })
], AppModule);
exports.AppModule = AppModule;
