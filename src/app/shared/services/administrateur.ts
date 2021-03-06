import { Observable } from "rxjs";
import { Responsable } from "./responsable";
import { Utilisateur } from "./utilisateur";

export interface Administrateur extends Utilisateur{

    responsableList :Observable<Responsable>;


}