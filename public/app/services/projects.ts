import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class Projects{
    constructor(private http:Http ){}
    getProjects(token:any){
        // console.log(token.toString().trim())
        return this.http.get('/api/projects?token='+token)
            // .map((response)=>{
            //     response.json();
            // });
    }
    getProject(_id:String,token:String){
         return this.http.get('/api/projects/'+_id+'?token='+token)
    }
    putScripts(_id:String,token:String,scripts:any){
         return this.http.put('/api/projects/'+_id+'/scriptsNew'+'?token='+token,scripts)
    }
    delScript(_id:String,token:String,scripts:any){
         return this.http.put('/api/projects/'+_id+'/scriptsNew'+'?token='+token,scripts)
    }
}