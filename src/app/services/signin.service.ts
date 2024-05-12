import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private actionService:CommonHttp) { }

  SignIn<T>(newUser:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.signin, newUser, params);
  }
  
  GenerateOTP<T>(newUser:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.generateOTP, newUser, params);
  }

  CheckUsernameExists(username:string){
    let params = new HttpParams();
    return this.actionService.get(environment.mainURL+environment.usernameCheck+"?username="+username);
  }
  GetCustomerUserType(){
    let params = new HttpParams();
    return this.actionService.get(environment.mainURL+environment.customerUserType);
  }  
  
  SubmitOTP<T>(newUser:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.submitOTP, newUser, params);
  }
}
