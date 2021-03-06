import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../shared/services/auth-service.service";
import {Router} from "@angular/router";
import {ResponsableService} from "../../shared/services/responsable.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthServiceService, private router: Router, private responsableService: ResponsableService) { }

  ngOnInit(): void {
  }

  signIn(username: string, password: string) {
    const payload = {
      username: username,
      password: password
    }

    this.authService.signIn(payload)
      .subscribe(
        data => {
          console.log("TOKEN: ", data.jwt);
          this.authService.setToken(data.jwt);
          localStorage.setItem("currentUser", JSON.stringify(payload.username));
          this.router.navigate(['home']);
        }
      )
  }
}
