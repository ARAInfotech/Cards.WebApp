import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';
import {Router} from "@angular/router"
import { constants } from '../models/constants';
import { LoginModel } from '../models/LoginModel';
import { user } from '../models/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  showError:boolean = false;
  showSuccess:boolean = false;
  errorMessage:string = "";
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(private actionService:LoginService, 
    private sessionSerive:SessionService,
    private router: Router,
    ){}

  ngOnInit(): void{ 
    sessionStorage.removeItem(constants.sessionName);
    sessionStorage.clear(); 
  }

  public register(): void{
    this.router.navigate(['/signin']);
  }

  public authenticate():void{
    var loginData = this.loginForm.value;
    let loginModel = new LoginModel();
    loginModel.Username = loginData.username as string;
    loginModel.Password = loginData.password as string;
    
    this.actionService.loginAction<LoginModel>(loginModel).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          this.showSuccess = true;
          this.showError = false;
          this.errorMessage = "";
          this.loginSuccessful(data.result);
        }
        else{
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = data.errorMessage;
        }
      },
      error: (e)=>{
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = "Something went wrong. Please try again.";
      }
    });    
  }

  loginSuccessful(userData: user){
    this.sessionSerive.writeSession(userData);      
    this.router.navigate(['/home']);
  }
}

