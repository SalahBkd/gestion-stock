import { Observable } from "rxjs";
import { Client } from "./client";
import { Commande } from "./commande";
import { Fournisseur } from "./fournisseur";
import { Produit } from "./produit";
import { Utilisateur } from "./utilisateur";

export interface Responsable extends Utilisateur{

    admin :any;
    clientsList :Observable<Client>;
    fournisseursList:Observable<Fournisseur>;
    commandesList :Observable<Commande>;
    produitsList:Observable<Produit>;


}