import { Observable } from "rxjs";
import { Client } from "./client";
import { LigneCommande } from "./ligneCommande";
import { Responsable } from "./responsable";

export interface Commande{

    idCommande :number;
    dateCommande : Date;
    quantite :number;
    prix :number;
    client :Client;
    responsable : Responsable;
    ligneCommandesList : Observable<LigneCommande>;


}