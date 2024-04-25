import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { CommonHttp } from './commonHttp.service';

@Injectable({
  providedIn: 'root'
})

export class Inventory {
    constructor(private actionService:CommonHttp) { }

    getAllHolidays(){
      return this.actionService.get(environment.mainURL+environment.adminHolidays);
    }

    getAllInventory(){
        return this.actionService.get(environment.mainURL+environment.allInventory);
    }

    addInventory<T>(objInventory: T){
        let params = new HttpParams();    
        return this.actionService.post<T>(environment.mainURL+environment.addInventory, objInventory, params);
    }

    editInventory<T>(objInventory: T){
        let params = new HttpParams();    
        return this.actionService.put<T>(environment.mainURL+environment.editInventory, objInventory, params);
    }

    deleteInventory(encInventoryID: string){
        encInventoryID = encodeURIComponent(encInventoryID);
        return this.actionService.delete(environment.mainURL+environment.deleteInventory+"?inventoryID="+encInventoryID);
    }
}