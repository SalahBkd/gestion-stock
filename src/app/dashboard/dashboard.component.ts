import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../shared/auth-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  accessHome() {
    this.authService.accessHome()
      .subscribe(data => console.log("DATA: ", data));
  }
}
