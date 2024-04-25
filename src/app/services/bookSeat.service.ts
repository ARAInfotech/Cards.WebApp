import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class BookSeat {

  constructor(private actionService:CommonHttp) { }

  getAllHolidays(){
    return this.actionService.get(environment.mainURL+environment.holidays);
  }

  getInventoryDetails(date: Date){
    let searchDate: string = "";
    searchDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    searchDate = encodeURIComponent(searchDate);
    return this.actionService.get(environment.mainURL+environment.inventory+"?dt="+searchDate);
  }

  getAllocationDetails(date: Date){
    let searchDate: string = "";
    searchDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    searchDate = encodeURIComponent(searchDate);
    return this.actionService.get(environment.mainURL+environment.allocation+"?date="+searchDate);
  }

  saveSeatBooking<T>(seatBook:T){
    let params = new HttpParams();
    return this.actionService.post<T>(environment.mainURL+environment.submitBooking, seatBook, params);
  }

}
