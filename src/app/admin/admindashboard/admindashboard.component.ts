import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../models/constants';
import { user } from '../../models/user';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  constructor(private sessionSerive:SessionService,
    private router: Router,
    ){}

  ngOnInit(): void{
    var x = this.sessionSerive.readSession<user>();

    // if(x == null || x == undefined){
    //   sessionStorage.removeItem(constants.sessionName);
    //   sessionStorage.clear(); 
    //   this.router.navigate(['']);
    // }
    // else{
    //   if(x.userTypeID !== 1){
    //     this.router.navigate(['']);
    //   }
    // }
  }
}

