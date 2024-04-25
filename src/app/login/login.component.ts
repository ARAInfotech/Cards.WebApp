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
  username:string = "";  
  password:string = "";
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
    private session:SessionService
    ){}
  ngOnInit(): void{ 
    sessionStorage.removeItem(constants.sessionName);
    sessionStorage.clear(); 
  }

  public authenticate():void{
    let loginModel = new LoginModel();
    loginModel.Username = this.username;
    loginModel.Password = this.password;
    
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
    alert('Login successful');
    this.sessionSerive.writeSession(userData);
    var x = this.session.readSession<user>();
    if(userData.userTypeID == "BsyERrRMrK0aACpBNAY08w=="){
      this.router.navigate(['/admin']);
    }
    else{
      this.router.navigate(['/home']);
    }
  }

  redirectToSignIn(){
    this.router.navigate(['/signin']);    
  }
}

