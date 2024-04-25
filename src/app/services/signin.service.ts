import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private actionService:CommonHttp) { }

  SignInAction<T>(newUser:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.signin, newUser, params);
  }
}
