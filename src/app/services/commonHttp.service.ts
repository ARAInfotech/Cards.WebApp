import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { user } from '../models/user';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
  })
  

export class CommonHttp {

    //private headers_object = new HttpHeaders();
    
    constructor(
        private httpClient:HttpClient,
        private session:SessionService
    ) 
    {
        
    }    

    getHeaderObject(): HttpHeaders{
        let header = new HttpHeaders();

        if(this.session.readSession<user>() != undefined){            
            let token: string = this.session.readSession<user>().token;
            header = new HttpHeaders().set("Authorization", "Bearer " + token)
                                    .set("Content-Type", "application/json")
                                    .set("X-HTTP-Method-Override", "PATCH")
                                    .set("Schwab-Resource-Version", environment.version)
                                    .set("Access-Control-Allow-Origin", "*");
        }
        else{
            header = new HttpHeaders().set("Content-Type", "application/json")
                                    .set("X-HTTP-Method-Override", "PATCH")
                                    .set("Schwab-Resource-Version", environment.version)
                                    .set("Access-Control-Allow-Origin", "*");
        }

        return header;
    }

    post<T>(url: string, model?: T, params?: HttpParams){        
        const httpOptions = {
            headers: this.getHeaderObject(),
            params: params
        };

        return this.httpClient.post<any>(url, model, httpOptions).pipe(
            map(response=>response),
            catchError(error => error)
        );
    }  

    put<T>(url: string, model: T, params?: HttpParams){       
        const httpOptions = {
            headers: this.getHeaderObject(),
            params: params
        };

        return this.httpClient.put<any>(url, model, httpOptions).pipe(
            map(response=>response),
            catchError(error => error)
        );
    }

    get(url: string){
        const httpOptions = {
            headers: this.getHeaderObject(),
          };

        return this.httpClient.get<any>(url, httpOptions).pipe(
            map(response=> response),
            catchError(error => error)
        );
    }

    async getAsyncData(url: string){
        const httpOptions = {
            headers: this.getHeaderObject(),
          };

        return await this.httpClient.get<any>(url, httpOptions).pipe(
            map(response=> response),
            catchError(error => error)
        );
    }

    delete(url: string){
        const httpOptions = {
            headers: this.getHeaderObject(),
          };
          
        return this.httpClient.delete<any>(url, httpOptions).pipe(
            map(response=> response),
            catchError(error => error)
        );
    }

    private encodeURIComponent(str: string) {
        return str.replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }
}