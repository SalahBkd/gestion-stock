import { Observable } from "rxjs";
import { Commande } from "./commande";
import { Responsable } from "./responsable";

export interface Client{

    idClient :number;
    nom :string;
    prenom :string;
    cin :string;
    rib :number;
    responsable : Responsable;
    commandesList : Observable<Commande>;


}