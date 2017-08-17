import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Auth} from './services/auth';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html'
})

export class AppComponent implements OnInit {
        loading = false;
        public height:Number
        constructor(private router:Router){
    }
    
    ngOnInit() {
        console.log('here')
        this.router.events.subscribe((event) => {
            // console.log(event);
            if(event.url!='/login' ) {    
                // console.log('->',event.url);
                this.height=80;
            }
        });
        this.router.navigate(['login']);
        
    }
    

}
