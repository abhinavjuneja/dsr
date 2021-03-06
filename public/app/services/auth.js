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
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
const material_1 = require("@angular/material");
const dialog_1 = require("./dialog");
require("rxjs/add/operator/map");
let Auth = class Auth {
    constructor(http, dialog) {
        this.http = http;
        this.dialog = dialog;
    }
    login(username, password) {
        return this.http.post('/api/login', { name: username, password: password })
            .map((response) => {
            let user = response.json();
            if (user && user.token) {
                localStorage.setItem('token', user.token);
            }
            else {
                let a = function () {
                    console.log('gotcha');
                };
                let data = {
                    "title": 'Invalid Crediantials',
                    "content": 'Please enter Valid Credentials!'
                };
                this.dialog.open(dialog_1.DialogLaunch, { data: data });
                throw Observable_1.Observable.throw(response);
            }
        });
    }
};
Auth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, material_1.MdDialog])
], Auth);
exports.Auth = Auth;
