import { Injectable } from '@angular/core';

@Injectable()
export class Alerts{
    Failed(data:any):void{
        console.log(data.message);
        return data.message;
    }
    
}