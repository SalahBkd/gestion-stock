import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../shared/services/auth-service.service";
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ClientService} from "../shared/services/client.service";
import {ProduitService} from "../shared/services/produit.service";
import {CommandeService} from "../shared/services/commande.service";
import {FrournisseurService} from "../shared/services/frournisseur.service";
import {Produit} from "../shared/services/produit";
import {Commande} from "../shared/services/commande";
import {Client} from "../shared/services/client";
import {Fournisseur} from "../shared/services/fournisseur";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  produits: Produit[] = null;
  commandes: Commande[] = null;
  clients: Client[] = null;
  fournisseurs: Fournisseur[] = null;
  data = [];
// Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Produits'], ['Clients'],['Fournisseurs'], 'Commandes'];
  public pieChartData: number[] = this.data;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private authService: AuthServiceService, private clientService: ClientService,
              private produitService: ProduitService, private cmdService: CommandeService,
              private frnsService: FrournisseurService) { }

  ngOnInit(): void {
    this.setProduits();
    this.setClients();
    this.setFournisseurs();
    this.setCommandes();
  }

  private setClients() {
    this.clientService.getClients()
      .subscribe(value => {
        this.clients = value;
        this.data.push(value.length);
      });
  }

  private setProduits() {
    this.produitService.getProduits()
      .subscribe(value => {
        this.produits = value;
        this.data.push(value.length);
      });
  }

  private setCommandes() {
    this.cmdService.getCommandes()
      .subscribe(value => {
        this.commandes = value;
        this.data.push(value.length);
      });
  }

  private setFournisseurs() {
    this.frnsService.getFournisseurs()
      .subscribe(value => {
        this.fournisseurs = value;
        this.data.push(value.length);
      });
  }
}
