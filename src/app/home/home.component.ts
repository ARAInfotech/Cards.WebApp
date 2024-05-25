import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { constants } from '../models/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  firstname:string = "";  
  lastname:string = "";

  constructor(private sessionSerive:SessionService,
    private router: Router,
    ){}
    
    ngOnInit(): void{
      var x = this.sessionSerive.readSession<user>();

      this.router.navigate(['admin/home']);

      // if(x == null || x == undefined){
      //   sessionStorage.removeItem(constants.sessionName);
      //   sessionStorage.clear(); 
      //   this.router.navigate(['']);
      // }
      // else{
      //   this.firstname = x.firstName;
      //   this.lastname = x.lastName;
      //   if(x.userTypeID == 1){
      //     this.router.navigate(['admin/home']);
      //   }
      // }
    }

}
