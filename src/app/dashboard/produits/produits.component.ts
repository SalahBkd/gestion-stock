import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../shared/services/produit.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Fournisseur} from "../../shared/services/fournisseur";
import {FrournisseurService} from "../../shared/services/frournisseur.service";
import {Responsable} from "../../shared/services/responsable";
import {ResponsableService} from "../../shared/services/responsable.service";
import {User} from "../../shared/services/User";
import {Produit} from "../../shared/services/produit";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public showAddFormPopup = false;
  public form: FormGroup;
  public fournisseurs: Fournisseur[];
  public responsables: User[];
  public produits: Produit[];
  public isUpdate = false;
  public showDeleteConfirmation = false;



  constructor(private router: Router, private produitService: ProduitService,
              private fournisseurService: FrournisseurService,
              private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.getFournisseurs();
    this.getResponsables();
    this.getProduits();
    this.form = new FormGroup({
      libelle: new FormControl(''),
      prixUnitaire: new FormControl(''),
      quantiteUnitaire: new FormControl(''),
      dateExperation: new FormControl(''),
      dateProduction: new FormControl(''),
      fournisseur: new FormControl(''),
      responsable: new FormControl(''),
    });
  }

  // UI
  toggleAddIcon() {
    this.showAddFormPopup = !this.showAddFormPopup;
  }

  handleAddProduits(produit: Produit) {
    this.toggleAddIcon();

  }

  handleUpdateProduit(produit: Produit) {
    this.isUpdate = true;
    this.toggleAddIcon();
    this.form = new FormGroup({
      idProduit: new FormControl(produit.idProduit),
      libelle: new FormControl(produit.libelle),
      prixUnitaire : new FormControl(produit.prixUnitaire),
      quantiteUnitaire : new FormControl(produit.quantiteUnitaire),
      dateProduction : new FormControl(produit.dateProduction),
      dateExperation : new FormControl(produit.dateExperation),
      responsable : new FormControl(produit.responsable.username),
      fournisseur : new FormControl(produit.fournisseur.nom)
    })
  }

  // FORM
  onSubmit(produit) {
    let tempProduit = {
      idProduit: produit.idProduit,
      libelle: produit.libelle,
      prixUnitaire: produit.prixUnitaire,
      quantiteUnitaire: produit.quantiteUnitaire,
      dateExperation: produit.dateExperation,
      dateProduction: produit.dateProduction,
      fournisseur: JSON.parse(produit.fournisseur),
      responsable: JSON.parse(produit.responsable)
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
    this.produitService.addProduit(tempProduit)
      .subscribe(() => this.ngOnInit())
  }


  private updateProduit(tempProduit) {
    console.log(tempProduit);
    this.produitService.updateProduit(tempProduit)
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
    this.produitService.getProduits()
      .subscribe(data => {
        console.log(data);
        this.produits = data;
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
    this.produitService.deleteProduit(idProduit)
      .subscribe(() => {
        this.toggleDeletePopup();
        this.ngOnInit();
      });
  }
}
