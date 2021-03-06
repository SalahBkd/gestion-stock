import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrateur } from './administrateur';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private apiServerUrl =environment.apiBaseUrl;
 
  constructor(private http:HttpClient) { }

  public getAdministrateurs():Observable<Administrateur[]>{
    return this.http.get<Administrateur[]>(`${this.apiServerUrl}/Administrateurs/all`);

  }

  public addAdministrateur(administrateur : Administrateur):Observable<Administrateur>{
    return this.http.post<Administrateur>(`${this.apiServerUrl}/Administrateurs/ajouter`,administrateur);

  }

  
  public updateAdministrateur(administrateur :Administrateur):Observable<Administrateur>{
    return this.http.put<Administrateur>(`${this.apiServerUrl}/Administrateurs/modifier/${administrateur.idUser}`,administrateur);

  }

  
  public deleteAdministrateur(administrateurId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Administrateurs/supprimer/${administrateurId}`);

  }
}
