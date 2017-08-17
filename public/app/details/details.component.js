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
const forms_1 = require("@angular/forms");
const projects_1 = require("../services/projects");
let Details = class Details {
    constructor(projects, route, fb) {
        this.projects = projects;
        this.route = route;
        this.fb = fb;
        this.start = 0;
        this.end = 10;
        this.pageIndex = 0;
        this.pageSize = 10;
        this.loading = true;
        this.local = localStorage.getItem('token');
        this.scripts = {
            name: ["", forms_1.Validators.required],
            design: ["", forms_1.Validators.required],
            executionChrome: ["", forms_1.Validators.required],
            executionFF: ["", forms_1.Validators.required],
            executionIE: ["", forms_1.Validators.required],
            numberOfTestCasesCovered: [""],
            comment: [""],
            createdBy: ["", forms_1.Validators.required],
            createdDate: ["", forms_1.Validators.required],
            deleteRequest: [""],
            deleteComment: ["", forms_1.Validators.required],
            complexity: [""]
        };
        this.detailForm = this.fb.group({
            code: [""],
            scripts: this.fb.array([
                this.fb.group(this.scripts)
            ])
        });
        this.JSON = JSON;
        this.code = this.detailForm.controls['code'].value;
        this.console = console;
        //    this.pageEvent= new PageEvent();
        //    console.log(this.pageEvent.length=1)
    }
    ngOnInit() {
        this.route.params.subscribe(data => {
            this.projectId = data['projectId'];
        }, error => {
            console.log('Not Found');
        });
        this.projects.getProject(this.projectId, this.local)
            .subscribe(data => {
            // console.log(this.projectId)
            let response = data.json();
            if (response) {
                console.log('aha', response[0].scripts);
                this.length = response[0].scripts.length;
                this.set(response);
                // console.log(this.formData);
                this.pageEvent1 = {
                    length: response[0].scripts.length,
                    pageIndex: 0,
                    pageSize: 10
                };
                this.scriptsData = this.detailForm.controls['scripts'].value;
                this.loading = false;
                this.setScripts(data);
                this.detailForm.valueChanges.subscribe(data => {
                    this.setScripts(data);
                    this.pageEvent.pageIndex = 0;
                    console.log(this.detailForm.controls.scripts.value);
                });
                // this.pageEvent.pageSize = 5;
            }
            else {
                console.log('Failed!!');
            }
        }, error => {
            console.log(error);
        });
    }
    set(response) {
        console.log(response);
        this.detailForm.patchValue(response[0]);
        const control = this.detailForm.controls['scripts'];
        for (let i = 0; i < response[0].scripts.length - 1; i++) {
            control.push(this.fb.group(this.scripts));
        }
        control.patchValue(response[0].scripts);
        this.formData = this.detailForm.value;
    }
    setScripts(response) {
        console.log(response);
        this.scriptsData = this.detailForm.controls['scripts'].value;
    }
    onPageEvent(event) {
        this.pageIndex = event.pageIndex;
        this.start = (event.pageIndex) * event.pageSize;
        if (event.pageIndex == Math.floor(event.length / event.pageSize)) {
            this.end = event.length;
        }
        else {
            this.end = ((event.pageIndex + 1) * event.pageSize);
        }
        console.log(this.start, this.end);
    }
    sendData() {
        let token = localStorage.getItem('token');
        this.projects.putScripts(this.projectId, token, { scripts: this.detailForm.controls.scripts.value }).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
    delScript(script) {
        let token = localStorage.getItem('token');
        this.projects.delScript(this.projectId, token, { scriptName: script }).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
};
Details = __decorate([
    core_1.Component({
        selector: 'detals',
        templateUrl: './app/details/details.component.html'
    }),
    __metadata("design:paramtypes", [projects_1.Projects, router_1.ActivatedRoute, forms_1.FormBuilder])
], Details);
exports.Details = Details;
