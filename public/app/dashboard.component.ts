import {Component, OnInit, Output, OnChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projects } from './services/projects';
import { FlexLayoutModule } from '@angular/flex-layout';
import {EventEmitter } from '@angular/core';
import {MdDialog} from '@angular/material';
import {DialogLaunch} from './services/dialog';


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    
    loading = false;
    public list:number[];
    private local= localStorage.getItem('token');
    constructor(private projects: Projects ,private router:Router,private dialog:MdDialog){
        
    }
    public getProject(_id:String):any{
        this.router.navigate(['details',_id])
    }
    ngOnInit() {
        this.loading=true;
        this.getProjects(this.local);
        
    }
    public getProjects(local:String):void{
        this.projects.getProjects(this.local).subscribe(list=>{
            let response = list.json();
            if(response){
                this.list=response;
            }
            else{
                console.log('Failed!!');
            }
        },
        error=>{
            console.log(error)
        });
    }
    public deleteProject(_id:String):void{
        this.projects.delProject(_id,this.local).subscribe(list=>{
                let response = list.json();
                if(response){
                    this.list=response;   
                }
                else{
                    console.log('Failed!!');
                }
        },
        error=>{
            console.log(error)
        });
    }

    public createProjectModel():void{
        let local=this.local;
        let createProject= this.createProject; 
        let projects = this.projects;
        let dialog = this.dialog;
        let these = this;
        let model={
            title:'Create Project',
            code:'',
            token:local,
            input:[{name:''}],
            button:[{name:'Create',task:createProject}],
            projects:projects,
            this:these
        }
        dialog.open(DialogLaunch,{data:model})
    }

    public createProject(ob:any):void{
        ob.projects.createProject({code:ob.input[0].name},ob.token).subscribe((d:any)=>{
            let response = d.json();
            if(response){
                console.log(ob.this.list); 
                
            }
            else{
                console.log('Failed!!');
            }
        })
        ob.this.getProjects(ob.this.local);
    }
}
