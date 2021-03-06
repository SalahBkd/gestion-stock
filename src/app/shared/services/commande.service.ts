import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commande } from './commande';
import {AuthServiceService} from "./auth-service.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiServerUrl =environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthServiceService) { }

  public getCommandes():Observable<Commande[]>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<Commande[]>(`${this.apiServerUrl}/Commandes/all`, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }

  public addCommande(commande : Commande):Observable<Commande>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post<Commande>(`${this.apiServerUrl}/Commandes/ajouter`,commande, {headers})
      .pipe(
          catchError(this.handlError)
      );
  }


  public updateCommande(commande : Commande):Observable<Commande>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put<Commande>(`${this.apiServerUrl}/Commandes/modifier`,commande, {headers})
      .pipe(
        catchError(this.handlError)
      );;

  }


  public deleteCommande(commandeId : number):Observable<void>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete<void>(`${this.apiServerUrl}/Commandes/supprimer/${commandeId}`, {headers})
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
