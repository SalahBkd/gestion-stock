import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from './fournisseur';
import { environment } from 'src/environments/environment';
import {Observable, throwError} from 'rxjs';
import {AuthServiceService} from "./auth-service.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FrournisseurService {
private apiServerUrl =environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthServiceService) { }

  public getFournisseurs():Observable<Fournisseur[]>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<Fournisseur[]>(`${this.apiServerUrl}/Fournisseurs/all`, {headers})
      .pipe(
        catchError(this.handlError)
      );;

  }

  public addFournisseur(fournisseur : Fournisseur):Observable<Fournisseur>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post<Fournisseur>(`${this.apiServerUrl}/Fournisseurs/ajouter`,fournisseur, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }


  public updateFournisseur(fournisseur : Fournisseur):Observable<Fournisseur>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put<Fournisseur>(`${this.apiServerUrl}/Fournisseurs/modifier/${fournisseur.idFournisseur}`,fournisseur, {headers})
      .pipe(
        catchError(this.handlError)
      );;
  }

  public deleteFournisseur(fournisseurId : number):Observable<void>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete<void>(`${this.apiServerUrl}/Fournisseurs/supprimer/${fournisseurId}`, {headers})
      .pipe(
        catchError(this.handlError)
      );;
  }

  // UTILS
  handlError(error: HttpErrorResponse): Observable<any> {
    // console.log(error.message);
    console.log(error);
    return throwError(' a data error occured please try again later.');
  }
}
