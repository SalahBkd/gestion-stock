import { Commande } from "./commande";
import { Produit } from "./produit";

export interface LigneCommande{
    
    idLigneCommande :number;
    quantiteCommande :number;
    totale :number;
    commande :Commande ;
    produit :Produit;
    


}