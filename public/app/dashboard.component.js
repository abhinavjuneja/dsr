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
const projects_1 = require("./services/projects");
let DashboardComponent = class DashboardComponent {
    constructor(projects, router) {
        this.projects = projects;
        this.router = router;
        this.loading = false;
        this.local = localStorage.getItem('token');
    }
    getProject(_id) {
        this.router.navigate(['details', _id]);
        // console.log(_id)
    }
    ngOnInit() {
        this.loading = true;
        // console.log(this.local)
        this.projects.getProjects(this.local).subscribe(data => {
            let response = data.json();
            if (response) {
                this.data = response;
            }
            else {
                console.log('Failed!!');
            }
        }, error => {
            console.log(error);
        });
    }
};
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/dashboard.component.html'
    }),
    __metadata("design:paramtypes", [projects_1.Projects, router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;