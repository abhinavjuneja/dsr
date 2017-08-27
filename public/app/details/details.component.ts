import {Component,Input, OnInit,AfterViewInit} from '@angular/core';
import {DashboardComponent} from '../dashboard.component';
import {Router,ActivatedRoute, RouterModule} from '@angular/router';
import {PageEvent, MdDialog} from '@angular/material';
import { Http, Headers, Response } from '@angular/http';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import {Projects} from '../services/projects';
import {DialogLaunch1} from '../addScript/dialog';

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

    constructor(private projects:Projects ,private route:ActivatedRoute, public fb: FormBuilder,public http:Http,public dialog:MdDialog){
        console.log(http)
       this.JSON = JSON;
       this.code = this.detailForm.controls['code'].value;
       this.console= console;
    }
    ngOnInit(){
        
        this.route.params.subscribe(data=>{
            this.projectId= data['projectId'];
        },
        error=>{
            console.log('Not Found')
        })
       this.updateScripts();
        
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
        this.start=(event.pageIndex ) * event.pageSize;
        
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
    // openDialog() {
    //     this.dialog.open(DialogLaunch);
    // }
    delScript(script:String,i:Number){
        // this.openDialog();
        let token = localStorage.getItem('token');
        this.projects.delScript(this.projectId,token,script).subscribe(data=>{
            console.log(JSON.parse(data._body));
            let arrayData=JSON.parse(data._body);
            this.detailForm.controls.scripts.removeAt(i);
            this.pageEvent1.length= arrayData.length;
            console.log(this.pageEvent1.length)
            this.scriptsData=this.detailForm.controls.scripts.value;
            // this.pageEvent1.length= arrayData.length;
            this.end=this.end-1;
            
        this.updateScripts();
        },err=>{
            console.log(err);
        })
    }
    
    public addScripts(scripts:any,token:String){
        // console.log("->>>>>",{scripts:[{"complexity":"easy","name":"name12","numberOfTestCasesCovered":"1"}]});
        // let scr={scripts:scripts};
        console.log("->>>>>",scripts);
        
        let http:Http;
        console.log("ssdcsdcs");
        this.this.http.put('/api/projects/'+this.this.projectId+'/scripts/?token='+this.this.local,{scripts:[{"complexity":"easy","name":"name12","numberOfTestCasesCovered":"1"}]})
        .subscribe((data:any)=>{
            console.log(data);
        },(err:any)=>{
            console.log(err);
        })
    }

    public updateScripts(){
        this.projects.getProject(this.projectId,this.local)
            .subscribe(data=>{
                // console.log(this.projectId)
                let response = data.json();
                let scripts=[];
                if(response.length>0 && response[0].hasOwnProperty('scripts')){
                    scripts=response[0].scripts;
                    this.length=response[0].scripts.length;
                }
                else{

                    this.length = 0;
                }
                this.pageEvent1={
                    length: scripts.length,
                    pageIndex: 0,
                    pageSize:10
                }
                this.loading = false;
                if(response && scripts.length){
                    this.set(response);
                    this.scriptsData = this.detailForm.controls['scripts'].value;
                    this.setScripts(data);
                    this.detailForm.valueChanges.subscribe(data=>{
                        this.setScripts(data);
                        console.log(this.detailForm.controls.scripts.value);
                    })
                }
                else{
                    console.log('No Data');
                }
            },
            error=>{
                console.log(error);
            });
    }

    public createAddScriptModel(){
        
        let token= this.local;
        let addScripts = this.addScripts;
        let projects = this.projects;
        let these= this;
        let model={
            title:'Add Scripts',
            token:token,
            multiInput:[[{name:'', title:'Script Name'},{name:'',  title:'Coverage'},{name:'', title:'Complexity'}]],
            button:[{name:'Add',task:addScripts,this:these}],
            projects:projects,
            this:these
        }
        console.log(token)
        this.dialog.open(DialogLaunch1,{data:{projectId:this.projectId, token:token}}).afterClosed()
        .subscribe((data:any)=>{
            this.updateScripts()
        },(err:any)=>{
            console.log(err);
        })
    }
}
