import {Component, Input} from '@angular/core';
import {MdDialog} from '@angular/material';


@Component({
  selector: 'DialogLaunch',
  templateUrl: './app/services/dialog.html',
  
})
export class DialogLaunch {
    @Input() message:String;
}