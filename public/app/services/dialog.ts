import {Component,Inject} from '@angular/core';
import { MdDialog,MD_DIALOG_DATA } from '@angular/material';
import { Http, Headers, Response } from '@angular/http';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'material-dialog',
  templateUrl: './app/services/mater.html'
})
export class DialogLaunch {
  public dataModel:any;
  public scriptData:any=[];
  constructor(@Inject(MD_DIALOG_DATA) public data: any,public fb: FormBuilder) {
    console.log(data)
    this.dataModel = data;
  }
  public addRow(dataModel:any):void{
    let array:any=dataModel.multiInput;
    console.log(dataModel);
    // array.forEach((element:any) => {
      console.log(this.data)
      this.data.multiInput.push(dataModel.multiInput[0]);

    // });

  }
  ngOnInit(){
    // scripts.push(this.fb.group({name:'aa'}))
    this.scriptForm.valueChanges.subscribe(data=>{
      // this.setData();
      // console.log("-->>",data);
    })
    // console.log("-->>",this.scriptForm.controls.scripts.value);
  }
  public json:any= this.json;
  public setData():void{
    const scripts = <FormArray>this.scriptForm.controls['scripts']    
    scripts.push(this.fb.group({name:'',numberOfTestCasesCovered:'',complexity:''}))
    console.log('here')
    this.scriptData = this.scriptForm.controls.scripts.value;
  }
  public scripts:any={
        name:["",Validators.required],
        numberOfTestCasesCovered: [""],
        complexity:[""]
    };
  public scriptForm = this.fb.group({
      scripts: this.fb.array([
          this.fb.group(this.scripts)
      ])
  });

}

