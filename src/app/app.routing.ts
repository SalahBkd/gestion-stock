import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./shared/auth.guard";


const appRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent},
  { path: '', redirectTo: 'home', pathMatch: "full"},
  {path: '**', redirectTo: 'not-found'},
];

export const routing = RouterModule.forRoot(appRoutes);
