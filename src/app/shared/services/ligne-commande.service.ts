import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LigneCommande } from './ligneCommande';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private apiServerUrl =environment.apiBaseUrl;
  
  constructor(private http:HttpClient) { }

  public getLigneCommandes():Observable<LigneCommande[]>{
    return this.http.get<LigneCommande[]>(`${this.apiServerUrl}/LigneCommandes/all`);

  }

  public addLigneCommande(ligneCommande : LigneCommande):Observable<LigneCommande>{
    return this.http.post<LigneCommande>(`${this.apiServerUrl}/LigneCommandes/ajouter`,ligneCommande);

  }

  
  public updateLigneCommande(ligneCommande : LigneCommande):Observable<LigneCommande>{
    return this.http.put<LigneCommande>(`${this.apiServerUrl}/LigneCommandes/modifier/${ligneCommande.idLigneCommande}`,ligneCommande);

  }

  
  public deleteLigneCommande(ligneCommandeId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/LigneCommandes/supprimer/${ligneCommandeId}`);

  }
}
