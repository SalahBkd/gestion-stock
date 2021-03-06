import { Observable } from "rxjs";
import { Produit } from "./produit";
import { Responsable } from "./responsable";

export interface Fournisseur{

    idFournisseur :number;
    nom :string;
    prenom :string;
    adresse :string;
    cin :string;
    responsable : Responsable;
    produitsList : Observable<Produit>;


}