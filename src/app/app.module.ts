import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ChartsModule} from "ng2-charts";
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthServiceService} from "./shared/services/auth-service.service";
import { ProduitsComponent } from './dashboard/produits/produits.component';
import { FournisseursComponent } from './dashboard/fournisseurs/fournisseurs.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { CommandesComponent } from './dashboard/commandes/commandes.component';
import { ProfileComponent } from './auth/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ProduitsComponent,
    FournisseursComponent,
    ClientsComponent,
    CommandesComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    ChartsModule
  ],
  providers: [DatePipe, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
