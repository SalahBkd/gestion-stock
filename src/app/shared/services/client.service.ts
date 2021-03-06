import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './client';
import {AuthServiceService} from "./auth-service.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl =environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthServiceService) { }

  public getClients():Observable<Client[]>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<Client[]>(`${this.apiServerUrl}/Clients/all`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  public addClient(client : Client):Observable<Client>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post<Client>(`${this.apiServerUrl}/Clients/ajouter`,client, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateClient(client : Client):Observable<Client>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put<Client>(`${this.apiServerUrl}/Clients/modifier`, client, {headers})
      .pipe(
          catchError(this.handleError)
      );
  }

  public deleteClient(clientId : number):Observable<void>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete<void>(`${this.apiServerUrl}/Clients/supprimer/${clientId}`, {headers})
      .pipe(
        catchError(this.handleError)
      );;
  }

  // UTILS
  handleError(error: HttpErrorResponse): Observable<any> {
    // console.log(error.message);
    console.log(error);
    return throwError(' a data error occured please try again later.');
  }
}
