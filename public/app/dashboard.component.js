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
const material_1 = require("@angular/material");
const dialog_1 = require("./services/dialog");
let DashboardComponent = class DashboardComponent {
    constructor(projects, router, dialog) {
        this.projects = projects;
        this.router = router;
        this.dialog = dialog;
        this.loading = false;
        this.local = localStorage.getItem('token');
    }
    getProject(_id) {
        this.router.navigate(['details', _id]);
    }
    ngOnInit() {
        this.loading = true;
        this.getProjects(this.local);
    }
    getProjects(local) {
        this.projects.getProjects(this.local).subscribe(list => {
            let response = list.json();
            if (response) {
                this.list = response;
            }
            else {
                console.log('Failed!!');
            }
        }, error => {
            console.log(error);
        });
    }
    deleteProject(_id) {
        this.projects.delProject(_id, this.local).subscribe(list => {
            let response = list.json();
            if (response) {
                this.list = response;
            }
            else {
                console.log('Failed!!');
            }
        }, error => {
            console.log(error);
        });
    }
    createProjectModel() {
        let local = this.local;
        let createProject = this.createProject;
        let projects = this.projects;
        let dialog = this.dialog;
        let these = this;
        let model = {
            title: 'Create Project',
            code: '',
            token: local,
            input: [{ name: '' }],
            button: [{ name: 'Create', task: createProject }],
            projects: projects,
            this: these
        };
        dialog.open(dialog_1.DialogLaunch, { data: model });
    }
    createProject(ob) {
        ob.projects.createProject({ code: ob.input[0].name }, ob.token).subscribe((d) => {
            let response = d.json();
            if (response) {
                console.log(ob.this.list);
            }
            else {
                console.log('Failed!!');
            }
        });
        ob.this.getProjects(ob.this.local);
    }
};
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/dashboard.component.html'
    }),
    __metadata("design:paramtypes", [projects_1.Projects, router_1.Router, material_1.MdDialog])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
