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
require("rxjs/add/operator/map");
let Projects = class Projects {
    constructor(http) {
        this.http = http;
    }
    getProjects(token) {
        // console.log(token.toString().trim())
        return this.http.get('/api/projects?token=' + token);
        // .map((response)=>{
        //     response.json();
        // });
    }
    getProject(_id, token) {
        return this.http.get('/api/projects/' + _id + '?token=' + token);
    }
    delProject(_id, token) {
        return this.http.delete('/api/projects/' + _id + '?token=' + token);
    }
    createProject(code, token) {
        return this.http.post('/api/projects?token=' + token, code);
    }
    putScripts(_id, token, scripts) {
        return this.http.put('/api/projects/' + _id + '/scriptsNew' + '?token=' + token, scripts);
    }
    delScript(_id, token, scripts) {
        return this.http.delete('/api/projects/' + _id + '/scripts/' + scripts + '?token=' + token);
    }
    addScripts(_id, token, scripts) {
        return this.http.put('/api/projects/' + _id + '/scripts/' + scripts + '?token=' + token, scripts);
    }
};
Projects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Projects);
exports.Projects = Projects;
