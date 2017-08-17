"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const auth_1 = require("./services/auth");
let Login = class Login {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.loading = false;
        this.height = 397;
    }
    ngOnInit() {
        console.log('AppComponent initializing...');
    }
    login(username, password) {
        this.loading = true;
        this.auth.login(username, password)
            .subscribe((data) => {
            // console.log(data)
            this.loading = false;
            this.router.navigate(['dashboard']);
        }, (error) => {
            this.loading = false;
        });
    }
};
Login = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './app/login.html'
    }),
    __metadata("design:paramtypes", [auth_1.Auth, router_1.Router])
], Login);
exports.Login = Login;
