import { Injectable } from '@angular/core';
import { constants } from '../models/constants';
import{session} from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  writeSession(data:any){
    sessionStorage.setItem(constants.sessionName, JSON.stringify(data));
  }

  readSession<T>(){
    let s = JSON.parse(sessionStorage.getItem(constants.sessionName)|| '{}') as session;
    return s as T;
  }
}
