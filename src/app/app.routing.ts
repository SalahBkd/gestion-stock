import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {ProduitsComponent} from "./dashboard/produits/produits.component";
import {FournisseursComponent} from "./dashboard/fournisseurs/fournisseurs.component";
import {ClientsComponent} from "./dashboard/clients/clients.component";
import {CommandesComponent} from "./dashboard/commandes/commandes.component";
import {ProfileComponent} from "./auth/profile/profile.component";


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {path: 'home', component: HomeComponent},
  {path: 'produits', component: ProduitsComponent},
  {path: 'fournisseurs', component: FournisseursComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'commandes', component: CommandesComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent},
  { path: '', redirectTo: 'home', pathMatch: "full"},
  {path: '**', redirectTo: 'not-found'},
];

export const routing = RouterModule.forRoot(appRoutes);
