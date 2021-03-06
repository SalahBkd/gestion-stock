import { Observable } from "rxjs";
import { Fournisseur } from "./fournisseur";
import { LigneCommande } from "./ligneCommande";
import { Responsable } from "./responsable";

export interface Produit{
    idProduit : number;
    libelle : string;
    prixUnitaire : number;
    quantiteUnitaire : number;
    dateProduction : Date;
    dateExperation : Date;
    responsable : Responsable;
    fournisseur : Fournisseur;
    ligneCommandesList : Observable<LigneCommande>;
}
