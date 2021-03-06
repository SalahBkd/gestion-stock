import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Fournisseur} from "../../shared/services/fournisseur";
import {User} from "../../shared/services/User";
import {Produit} from "../../shared/services/produit";
import {Router} from "@angular/router";
import {ProduitService} from "../../shared/services/produit.service";
import {FrournisseurService} from "../../shared/services/frournisseur.service";
import {ResponsableService} from "../../shared/services/responsable.service";
import {Commande} from "../../shared/services/commande";
import {CommandeService} from "../../shared/services/commande.service";
import {Client} from "../../shared/services/client";
import {ClientService} from "../../shared/services/client.service";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  public showAddFormPopup = false;
  public form: FormGroup;
  public commandes: Commande[];
  public responsables: User[];
  public produits: Produit[];
  public isUpdate = false;
  public showDeleteConfirmation = false;
  public clients: Client[];


  constructor(private router: Router, private produitService: ProduitService,
              private cmdService: CommandeService,
              private responsableService: ResponsableService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getCommandes();
    this.getResponsables();
    this.getClients();
    this.form = new FormGroup({
      dateCommande: new FormControl(''),
      quantite: new FormControl(''),
      prix: new FormControl(''),
      client: new FormControl(''),
      responsable: new FormControl('')
    });
  }

  // UI
  toggleAddIcon() {
    this.showAddFormPopup = !this.showAddFormPopup;
  }

  handleAddProduits(produit: Produit) {
    this.toggleAddIcon();
  }

  handleUpdateProduit(cmd: Commande) {
    this.isUpdate = true;
    this.toggleAddIcon();
    this.form = new FormGroup({
      idCommande: new FormControl(cmd.idCommande),
      dateCommande: new FormControl(cmd.dateCommande),
      quantite: new FormControl(cmd.quantite),
      prix: new FormControl(cmd.prix),
      client: new FormControl(cmd.client.nom),
      responsable: new FormControl(cmd.responsable.username),
    })
  }

  // FORM
  onSubmit(client) {
    let tempProduit = {
      idCommande: client.idCommande,
      quantite: client.quantite,
      prix: client.prix,
      client: JSON.parse(client.client),
      responsable: JSON.parse(client.responsable)
    }
    if (this.isUpdate) {
      this.updateProduit(tempProduit);
    } else {
      this.addProduit(tempProduit);
    }
    this.showAddFormPopup = false;
    this.form.reset();
    this.form = null;
  }


  // HANDLE DATA

  private addProduit(tempProduit) {
    this.cmdService.addCommande(tempProduit)
      .subscribe(() => this.ngOnInit())
  }


  private updateProduit(tempProduit) {
    console.log(tempProduit);
    this.cmdService.updateCommande(tempProduit)
      .subscribe(() => this.ngOnInit());
  }

  private getResponsables() {
    this.responsableService.getResponsables()
      .subscribe(data => {
        this.responsables = data;
      });
  }

  private getCommandes() {
    this.cmdService.getCommandes()
      .subscribe(data => {
        console.log(data);
        this.commandes = data;
      });
  }

  handleDeleteProduit(idProduit: number) {
    this.showDeleteConfirmation = true;
    console.log(idProduit);
  }

  toggleDeletePopup() {
    this.showDeleteConfirmation = false;
  }

  handleDeleteConfirmation(idProduit: number) {
    this.cmdService.deleteCommande(idProduit)
      .subscribe(() => {
        this.toggleDeletePopup();
        this.ngOnInit();
      });
  }

  private getClients() {
    this.clientService.getClients()
      .subscribe(data => this.clients = data);
  }
}
