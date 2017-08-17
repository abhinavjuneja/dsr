import {Component,Input, OnInit} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router,ActivatedRoute, RouterModule} from '@angular/router';
import {PageEvent} from '@angular/material';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import {Projects} from '../services/projects';

@Component({
    selector: 'detals',
    templateUrl: './app/details/details.component.html'

})

export class Details implements OnInit{
    public data:any;
    public formData:any;
    public code:String;
    public scriptsData:any;
    public length:Number;
    public start:Number=0;
    public end:Number=10;
    public pageEvent:PageEvent;
    public pageEvent1:any;
    public pageIndex:Number=0;
    public pageSize:Number=10;
    public JSON:any;
    public loading=true;
    public projectId:String;
    public console:any
    public local:String =localStorage.getItem('token');
    public scripts:any={
                name:["",Validators.required],
                design :["",Validators.required],
                executionChrome :["",Validators.required],
                executionFF :["",Validators.required],
                executionIE :["",Validators.required],
                numberOfTestCasesCovered: [""],
                comment: [""],
                createdBy: ["",Validators.required],
                createdDate: ["",Validators.required],
                deleteRequest :[""],
                deleteComment:["",Validators.required],
                complexity:[""]
            };
    public detailForm = this.fb.group({
        code:[""],
        scripts: this.fb.array([
            this.fb.group(this.scripts)
        ])
    });

    constructor(private projects:Projects ,private route:ActivatedRoute, public fb: FormBuilder){
       this.JSON = JSON;
       this.code = this.detailForm.controls['code'].value;
       this.console= console;
    //    this.pageEvent= new PageEvent();
    //    console.log(this.pageEvent.length=1)
    }
    ngOnInit(){
        
        this.route.params.subscribe(data=>{
            this.projectId= data['projectId'];
        },
        error=>{
            console.log('Not Found')
        })
        
        this.projects.getProject(this.projectId,this.local)
            .subscribe(data=>{
                // console.log(this.projectId)
                let response = data.json();
                if(response){
                    console.log('aha',response[0].scripts);
                    this.length=response[0].scripts.length;
                    this.set(response);
                    // console.log(this.formData);
                    this.pageEvent1={
                        length: response[0].scripts.length,
                        pageIndex: 0,
                        pageSize:10
                    }
                    this.scriptsData = this.detailForm.controls['scripts'].value;
                    this.loading = false;
                    this.setScripts(data);
                    this.detailForm.valueChanges.subscribe(data=>{
                        this.setScripts(data);
                        this.pageEvent.pageIndex=0
                        console.log(this.detailForm.controls.scripts.value);
                       
                    })
                    // this.pageEvent.pageSize = 5;
                }
                else{
                    console.log('Failed!!');
                }
            },
            error=>{
                console.log(error);
            });
        
    }
    set(response:any):void{
        console.log(response)
        
        this.detailForm.patchValue(response[0]);
        const control = <FormArray>this.detailForm.controls['scripts'];
        for(let i=0;i<response[0].scripts.length-1;i++){
            control.push(this.fb.group(
                this.scripts
            ))
        }
        control.patchValue(response[0].scripts);
        this.formData = this.detailForm.value;
    }
    setScripts(response:any):void{
        console.log(response)
        this.scriptsData = this.detailForm.controls['scripts'].value

    }
    onPageEvent(event:PageEvent){
        this.pageIndex = event.pageIndex
        this.start=(event.pageIndex )* event.pageSize;
        
        if(event.pageIndex == Math.floor(event.length/event.pageSize)){
            this.end = event.length
            
        }
        else{
            this.end=((event.pageIndex+1)* event.pageSize);
        }
        console.log(this.start,this.end)
    }
    sendData(){
        let token = localStorage.getItem('token');
        this.projects.putScripts(this.projectId,token,{scripts:this.detailForm.controls.scripts.value}).subscribe(data=>{
            console.log(data);
        },err=>{
            console.log(err);
        })
    }
    delScript(script:String){
        let token = localStorage.getItem('token');
        this.projects.delScript(this.projectId,token,{scriptName:script}).subscribe(data=>{
            console.log(data);
        },err=>{
            console.log(err);
        })
    }
    
}
