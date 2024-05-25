import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { environment } from '../environments/environments';
import { constants } from './models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Valavi Wedding Cards';
  constructor(private bnIdle: BnNgIdleService) { // initiate it in your component constructor
    this.bnIdle.startWatching(environment.sessionTimeout).subscribe((res) => {
      if(res) {
          sessionStorage.removeItem(constants.sessionName);
          sessionStorage.clear();
          window.location.reload();
      }
    })
  }
}
