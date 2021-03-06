import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../shared/services/auth-service.service";
import {User} from "../../shared/services/User";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private user: User;

  constructor(public authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp(username: string, password: string, email: string, cin: string, rib: string, etat: string) {
    this.user = {
      idUser: null,
      username: username,
      password: password,
      email: email,
      cin: cin,
      rib: rib,
      etat: etat === "on" ? "true" : "false"
    };

    this.authService.signUp(this.user)
      .subscribe(() => {
        this.router.navigate(['sign-in']);
      });
  }
}
