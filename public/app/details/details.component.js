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
const material_1 = require("@angular/material");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const projects_1 = require("../services/projects");
const dialog_1 = require("../addScript/dialog");
let Details = class Details {
    constructor(projects, route, fb, http, dialog) {
        this.projects = projects;
        this.route = route;
        this.fb = fb;
        this.http = http;
        this.dialog = dialog;
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
        console.log(http);
        this.JSON = JSON;
        this.code = this.detailForm.controls['code'].value;
        this.console = console;
    }
    ngOnInit() {
        this.route.params.subscribe(data => {
            this.projectId = data['projectId'];
        }, error => {
            console.log('Not Found');
        });
        this.updateScripts();
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
    // openDialog() {
    //     this.dialog.open(DialogLaunch);
    // }
    delScript(script, i) {
        // this.openDialog();
        let token = localStorage.getItem('token');
        this.projects.delScript(this.projectId, token, script).subscribe(data => {
            console.log(JSON.parse(data._body));
            let arrayData = JSON.parse(data._body);
            this.detailForm.controls.scripts.removeAt(i);
            this.pageEvent1.length = arrayData.length;
            console.log(this.pageEvent1.length);
            this.scriptsData = this.detailForm.controls.scripts.value;
            // this.pageEvent1.length= arrayData.length;
            this.end = this.end - 1;
            this.updateScripts();
        }, err => {
            console.log(err);
        });
    }
    addScripts(scripts, token) {
        // console.log("->>>>>",{scripts:[{"complexity":"easy","name":"name12","numberOfTestCasesCovered":"1"}]});
        // let scr={scripts:scripts};
        console.log("->>>>>", scripts);
        let http;
        console.log("ssdcsdcs");
        this.this.http.put('/api/projects/' + this.this.projectId + '/scripts/?token=' + this.this.local, { scripts: [{ "complexity": "easy", "name": "name12", "numberOfTestCasesCovered": "1" }] })
            .subscribe((data) => {
            console.log(data);
        }, (err) => {
            console.log(err);
        });
    }
    updateScripts() {
        this.projects.getProject(this.projectId, this.local)
            .subscribe(data => {
            // console.log(this.projectId)
            let response = data.json();
            let scripts = [];
            if (response.length > 0 && response[0].hasOwnProperty('scripts')) {
                scripts = response[0].scripts;
                this.length = response[0].scripts.length;
            }
            else {
                this.length = 0;
            }
            this.pageEvent1 = {
                length: scripts.length,
                pageIndex: 0,
                pageSize: 10
            };
            this.loading = false;
            if (response && scripts.length) {
                this.set(response);
                this.scriptsData = this.detailForm.controls['scripts'].value;
                this.setScripts(data);
                this.detailForm.valueChanges.subscribe(data => {
                    this.setScripts(data);
                    console.log(this.detailForm.controls.scripts.value);
                });
            }
            else {
                console.log('No Data');
            }
        }, error => {
            console.log(error);
        });
    }
    createAddScriptModel() {
        let token = this.local;
        let addScripts = this.addScripts;
        let projects = this.projects;
        let these = this;
        let model = {
            title: 'Add Scripts',
            token: token,
            multiInput: [[{ name: '', title: 'Script Name' }, { name: '', title: 'Coverage' }, { name: '', title: 'Complexity' }]],
            button: [{ name: 'Add', task: addScripts, this: these }],
            projects: projects,
            this: these
        };
        console.log(token);
        this.dialog.open(dialog_1.DialogLaunch1, { data: { projectId: this.projectId, token: token } }).afterClosed()
            .subscribe((data) => {
            this.updateScripts();
        }, (err) => {
            console.log(err);
        });
    }
};
Details = __decorate([
    core_1.Component({
        selector: 'detals',
        templateUrl: './app/details/details.component.html'
    }),
    __metadata("design:paramtypes", [projects_1.Projects, router_1.ActivatedRoute, forms_1.FormBuilder, http_1.Http, material_1.MdDialog])
], Details);
exports.Details = Details;
