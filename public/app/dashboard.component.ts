import {Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projects } from './services/projects';
import { FlexLayoutModule } from '@angular/flex-layout';
import {EventEmitter } from '@angular/core';


@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    
    loading = false;
    public data:any;
    private local= localStorage.getItem('token');
    constructor(private projects: Projects ,private router:Router){
        
    }
    getProject(_id:String):any{
        this.router.navigate(['details',_id])
        // console.log(_id)
    }
    ngOnInit() {
        this.loading=true;
        // console.log(this.local)
        this.projects.getProjects(this.local).subscribe(data=>{
                let response = data.json();
                if(response){
                    this.data=response;   
                }
                else{
                    console.log('Failed!!');
                }
        },
        error=>{
            console.log(error)
        });
    }
    

}
