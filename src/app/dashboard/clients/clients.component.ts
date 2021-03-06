import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Fournisseur} from "../../shared/services/fournisseur";
import {User} from "../../shared/services/User";
import {Produit} from "../../shared/services/produit";
import {Router} from "@angular/router";
import {FrournisseurService} from "../../shared/services/frournisseur.service";
import {ResponsableService} from "../../shared/services/responsable.service";
import {Client} from "../../shared/services/client";
import {ClientService} from "../../shared/services/client.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public showAddFormPopup = false;
  public form: FormGroup;
  public clients: Client[];
  public responsables: User[];
  public produits: Produit[];
  public isUpdate = false;
  public showDeleteConfirmation = false;

  constructor(private router: Router,
              private clientService: ClientService,
              private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.getClients();
    this.getResponsables();
    this.form = new FormGroup({
      idClient: new FormControl(''),
      cin: new FormControl(''),
      nom: new FormControl(''),
      prenom : new FormControl(''),
      rib : new FormControl(''),
      responsable : new FormControl(''),
    });
  }

  // UI
  toggleAddIcon() {
    this.showAddFormPopup = !this.showAddFormPopup;
  }

  handleAddProduits(produit: Produit) {
    this.toggleAddIcon();

  }

  handleUpdateProduit(client: Client) {
    this.isUpdate = true;
    this.toggleAddIcon();
    this.form = new FormGroup({
      idClient: new FormControl(client.idClient),
      cin: new FormControl(client.cin),
      nom: new FormControl(client.nom),
      prenom : new FormControl(client.prenom),
      rib : new FormControl(client.rib),
      responsable : new FormControl(client.responsable.username),
    })
  }

  // FORM
  onSubmit(client) {
    let tempProduit = {
      idClient : client.idClient,
      cin: client.cin,
      nom: client.nom,
      prenom: client.prenom,
      rib: client.rib,
      responsable: JSON.parse(client.responsable)
    }
    if(this.isUpdate) {
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
    this.clientService.addClient(tempProduit)
      .subscribe(() => this.ngOnInit())
  }


  private updateProduit(tempProduit) {
    console.log(tempProduit);
    this.clientService.updateClient(tempProduit)
      .subscribe(() => this.ngOnInit());
  }

  private getResponsables() {
    this.responsableService.getResponsables()
      .subscribe(data => {
        this.responsables = data;
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
    this.clientService.deleteClient(idProduit)
      .subscribe(() => {
        this.toggleDeletePopup();
        this.ngOnInit();
      });
  }

  private getClients() {
    this.clientService.getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }
}
