import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Produit } from './produit';
import { environment } from 'src/environments/environment';
import {AuthServiceService} from "./auth-service.service";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
private apiServerUrl =environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthServiceService) { }


  public getProduits():Observable<Produit[]>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<Produit[]>(`${this.apiServerUrl}/Produits/all`, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }


  public updateProduit(produit : Produit):Observable<Produit>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put<Produit>(`${this.apiServerUrl}/Produits/modifier`, produit, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }


  public deleteProduit(produitId : number):Observable<void>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete<void>(`${this.apiServerUrl}/Produits/supprimer/${produitId}`, {headers})
      .pipe(
        catchError(this.handlError)
      );

  }

  // UTILS
  handlError(error: HttpErrorResponse): Observable<any> {
    // console.log(error.message);
    console.log(error);
    return throwError(' a data error occured please try again later.');
  }

  addProduit(tempProduit: Produit) : Observable<Produit>{
    let tokenStr = 'Bearer ' + this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post<Produit>(`${this.apiServerUrl}/Produits/ajouter`,tempProduit, {headers})
      .pipe(
        catchError(this.handlError)
      );;
  }
}
