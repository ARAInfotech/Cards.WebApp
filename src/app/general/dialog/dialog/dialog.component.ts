import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { DialogData } from '../../../models/dialogData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){
  }

  faCircleCheck = faCircleCheck;

}
