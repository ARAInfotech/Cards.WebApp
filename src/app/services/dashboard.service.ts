import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DashBoard {
    constructor(private actionService:CommonHttp) { }

    getAllUserBooking(userID: string){
      userID = encodeURIComponent(userID);
      return this.actionService.get(environment.mainURL+environment.allBooking+"?userID="+userID);
    }

    deleteBooking(encBookingID: string){
      encBookingID = encodeURIComponent(encBookingID);
      return this.actionService.delete(environment.mainURL+environment.deleteBooking+"?allocationID="+encBookingID);
    }

    editBooking<T>(seatBook:T){
      let params = new HttpParams();
  
      return this.actionService.put<T>(environment.mainURL+environment.editBooking, seatBook, params);
    }
}