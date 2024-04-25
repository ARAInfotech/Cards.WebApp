import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, throwError } from 'rxjs';
import { user } from '../models/user';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private actionService:CommonHttp) { }

  GetAllWeather<T>(){
    let params = new HttpParams();
    return this.actionService.get(environment.mainURL+environment.weather); 
  }
}