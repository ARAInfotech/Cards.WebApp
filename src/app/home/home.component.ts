import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { user } from '../models/user';

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

      this.firstname = x.firstName;
      this.lastname = x.lastName;
    }

}
