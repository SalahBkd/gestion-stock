import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Fournisseur} from "../../shared/services/fournisseur";
import {User} from "../../shared/services/User";
import {Produit} from "../../shared/services/produit";
import {Router} from "@angular/router";
import {ProduitService} from "../../shared/services/produit.service";
import {FrournisseurService} from "../../shared/services/frournisseur.service";
import {ResponsableService} from "../../shared/services/responsable.service";

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {

  public showAddFormPopup = false;
  public form: FormGroup;
  public fournisseurs: Fournisseur[];
  public responsables: User[];
  public produits: Produit[];
  public isUpdate = false;
  public showDeleteConfirmation = false;

  constructor(private router: Router, private frnsService: FrournisseurService,
              private fournisseurService: FrournisseurService,
              private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.getFournisseurs();
    this.getResponsables();
    this.getProduits();
    this.form = new FormGroup({
      idFournisseur: new FormControl(''),
      adresse: new FormControl(''),
      cin: new FormControl(''),
      nom: new FormControl(''),
      prenom : new FormControl(''),
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

  handleUpdateProduit(frns: Fournisseur) {
    this.isUpdate = true;
    this.toggleAddIcon();
    this.form = new FormGroup({
      idFournisseur: new FormControl(frns.idFournisseur),
      adresse: new FormControl(frns.adresse),
      cin: new FormControl(frns.cin),
      nom: new FormControl(frns.nom),
      prenom : new FormControl(frns.prenom),
      responsable : new FormControl(frns.responsable.username),
    })
  }

  // FORM
  onSubmit(frns) {
    let tempProduit = {
      idFournisseur: frns.idFournisseur,
      adresse: frns.adresse,
      cin: frns.cin,
      nom: frns.nom,
      prenom: frns.prenom,
      responsable: JSON.parse(frns.responsable)
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
    this.frnsService.addFournisseur(tempProduit)
      .subscribe(() => this.ngOnInit())
  }


  private updateProduit(tempProduit) {
    console.log(tempProduit);
    this.frnsService.updateFournisseur(tempProduit)
      .subscribe(() => this.ngOnInit());
  }

  private getFournisseurs() {
    this.fournisseurService.getFournisseurs()
      .subscribe(data => {
        this.fournisseurs = data;
      });
  }

  private getResponsables() {
    this.responsableService.getResponsables()
      .subscribe(data => {
        this.responsables = data;
      });
  }

  private getProduits() {
    this.frnsService.getFournisseurs()
      .subscribe(data => {
        console.log(data);
        this.fournisseurs = data;
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
    this.frnsService.deleteFournisseur(idProduit)
      .subscribe(() => {
        this.toggleDeletePopup();
        this.ngOnInit();
      });
  }

}
