import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class Holidays {

  constructor(private actionService:CommonHttp) { }

  getAllHolidays(){
    return this.actionService.get(environment.mainURL+environment.adminHolidays);
  }

  deleteHoliday(encHolidayID: string){
    encHolidayID = encodeURIComponent(encHolidayID);
    return this.actionService.delete(environment.mainURL+environment.deleteHoliday+"?holidayID="+encHolidayID);
  }

  editHoliday<T>(objHoliday: T){
    let params = new HttpParams();
  
      return this.actionService.put<T>(environment.mainURL+environment.editHoliday, objHoliday, params);
  }

  addHoliday<T>(objHoliday: T){
    let params = new HttpParams();
  
      return this.actionService.post<T>(environment.mainURL+environment.addHoliday, objHoliday, params);
  }
}