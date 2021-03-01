import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../shared/auth-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(public authService: AuthServiceService, private router: Router) { }

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
          this.router.navigate(['dashboard']);
        }
      )
  }
}
