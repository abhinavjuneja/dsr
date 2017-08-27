import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdDialog,MdDialogRef  } from '@angular/material';
import { DialogLaunch } from './dialog';
import { DialogOverviewExample,DialogOverviewExampleDialog} from '../toBeDel/Dialog';


import 'rxjs/add/operator/map';

@Injectable()
export class Auth{
    constructor(private http:Http, public dialog: MdDialog){}
    login(username:String, password:String){
        return this.http.post('/api/login', {name: username, password: password})
            .map((response:Response)=>{
                let user = response.json();
                if(user && user.token){
                    localStorage.setItem('token',user.token);
                }
                else{
                    let a= function(){
                        console.log('gotcha');
                    }
                    let data={
                        "title": 'Invalid Crediantials',
                        "content":'Please enter Valid Credentials!'
                    };
                    this.dialog.open(DialogLaunch,{ data :data });
                    throw Observable.throw(response);
                }
            });
    }
}