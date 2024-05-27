import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private actionService:CommonHttp) { }

  SignIn<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.signin, model, params);
  }
  
  GenerateSignInOTP<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.generateSignInOTP, model, params);
  }

  CheckUsernameExists(username:string){
    let params = new HttpParams();
    return this.actionService.get(environment.mainURL+environment.usernameCheck+"?username="+username);
  }
  GetCustomerUserType(){
    let params = new HttpParams();
    return this.actionService.get(environment.mainURL+environment.customerUserType);
  }  
  
  SubmitSignInOTP<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.submitOTP, model, params);
  }
  
  GenerateForgotPasswordOTP<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.forgotPasswordOTP, model, params);
  } 
  
  SubmitForgotPasswordOTP<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.submitForgotPasswordOTP, model, params);
  }
  
  SubmitResetPassword<T>(model:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.submitResetPassword, model, params);
  }
}
