import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, pipe, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Responsable } from './responsable';
import {AuthServiceService} from "./auth-service.service";
import {User} from "./User";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private apiServerUrl =environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthServiceService) { }

  public getResponsable(respoName):Observable<User>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<User>(`${this.apiServerUrl}/Responsables/${respoName}`, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }

  public getResponsables():Observable<User[]>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<User[]>(`${this.apiServerUrl}/Responsables/all`, {headers})
      .pipe(
      catchError(this.handlError)
    );

  }

  public addResponsable(responsable : Responsable):Observable<Responsable>{
    return this.http.post<Responsable>(`${this.apiServerUrl}/Responsables/ajouter`,responsable);

  }


  public updateResponsable(responsable : Responsable):Observable<Responsable>{
    return this.http.put<Responsable>(`${this.apiServerUrl}/Responsables/modifier/${responsable.idUser}`,responsable);

  }


  public deleteResponsable(responsableId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Responsables/supprimer/${responsableId}`);

  }

  // UTILS
  handlError(error: HttpErrorResponse): Observable<any> {
    // console.log(error.message);
    console.log(error);
    return throwError(' a data error occured please try again later.');
  }
}
