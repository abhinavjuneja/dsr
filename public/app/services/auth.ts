import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { DialogLaunch } from './dialog';

import 'rxjs/add/operator/map';

@Injectable()
export class Auth{
    constructor(private http:Http, public dialog: MdDialog, public dialogLaunch:DialogLaunch){}
    login(username:String, password:String){
        return this.http.post('/api/login', {name: username, password: password})
            .map((response:Response)=>{
                let user = response.json();
                if(user && user.token){
                    localStorage.setItem('token',user.token);
                }
                else{
                    this.dialog.open(DialogLaunch);
                    throw Observable.throw(response);
                }
            });
    }
}