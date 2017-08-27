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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const forms_1 = require("@angular/forms");
let DialogLaunch = class DialogLaunch {
    constructor(data, fb) {
        this.data = data;
        this.fb = fb;
        this.scriptData = [];
        this.json = this.json;
        this.scripts = {
            name: ["", forms_1.Validators.required],
            numberOfTestCasesCovered: [""],
            complexity: [""]
        };
        this.scriptForm = this.fb.group({
            scripts: this.fb.array([
                this.fb.group(this.scripts)
            ])
        });
        console.log(data);
        this.dataModel = data;
    }
    addRow(dataModel) {
        let array = dataModel.multiInput;
        console.log(dataModel);
        // array.forEach((element:any) => {
        console.log(this.data);
        this.data.multiInput.push(dataModel.multiInput[0]);
        // });
    }
    ngOnInit() {
        // scripts.push(this.fb.group({name:'aa'}))
        this.scriptForm.valueChanges.subscribe(data => {
            // this.setData();
            // console.log("-->>",data);
        });
        // console.log("-->>",this.scriptForm.controls.scripts.value);
    }
    setData() {
        const scripts = this.scriptForm.controls['scripts'];
        scripts.push(this.fb.group({ name: '', numberOfTestCasesCovered: '', complexity: '' }));
        console.log('here');
        this.scriptData = this.scriptForm.controls.scripts.value;
    }
};
DialogLaunch = __decorate([
    core_1.Component({
        selector: 'material-dialog',
        templateUrl: './app/services/mater.html'
    }),
    __param(0, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [Object, forms_1.FormBuilder])
], DialogLaunch);
exports.DialogLaunch = DialogLaunch;
