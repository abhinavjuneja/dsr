import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Auth} from './services/auth';

@Component({
    selector: 'login',
    templateUrl: './app/login.html'
})

export class Login implements OnInit {
    loading = false;
    constructor(private auth:Auth, private router:Router){
    }
    public height:Number=397;
    ngOnInit() {
        console.log('AppComponent initializing...');
    }
    login(username:String,password:String){
        this.loading=true;
        this.auth.login(username,password)
            .subscribe(
            (data)=>{
                // console.log(data)
                this.loading=false;
                this.router.navigate(['dashboard']);
            },
            (error) => {
                this.loading = false;
            })
    }

}
