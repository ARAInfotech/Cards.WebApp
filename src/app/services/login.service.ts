import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, throwError } from 'rxjs';
import { user } from '../models/user';
import { CommonHttp } from './commonHttp.service';
import { LoginModel } from '../models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private actionService:CommonHttp) { }

  loginAction<T>(userModel:T){
    let params = new HttpParams();

    return this.actionService.post<T>(environment.mainURL+environment.login, userModel, params);
  }

}
