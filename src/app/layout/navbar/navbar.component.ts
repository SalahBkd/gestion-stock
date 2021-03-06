import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../shared/services/auth-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");

    if(currentUser !== null) {
      return true;
    }
    return false;
  }

  getUsername() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
}
