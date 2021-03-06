import { Component, OnInit } from '@angular/core';
import {ResponsableService} from "../../shared/services/responsable.service";
import {User} from "../../shared/services/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.setProfile();
  }

  private setProfile() {
    console.log(JSON.parse(localStorage.getItem("currentUser")));
    this.responsableService.getResponsable("yusuf")
      .subscribe(data => {
        this.user = data;
      })
  }
}
