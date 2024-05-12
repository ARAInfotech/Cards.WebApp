import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  
/*   @Input() valueHijo: string = 'Texto desde el componente hijo';
  
  @Output() salida = new EventEmitter<string>(); */

  @Input() visible: boolean = false;
  @Input() hideClose: boolean = false;
  @Input() header: string = "";
  @Input() message: string = "";
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit(false);
  }
}
