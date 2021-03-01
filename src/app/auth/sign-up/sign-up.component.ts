import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../shared/auth-service.service";
import {User} from "../../shared/User";
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
