import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "./User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private BASE_URL = "http://localhost:8080";
  private storageKey = "gestionstock-user"

  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate([`${this.BASE_URL}/auth/register-responsable`]);

  }

  // SIGN UP RESPONSABLE
  signUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/auth/register-responsable`, user)
      .pipe(
        catchError(this.handlError)
      );
  }

  // SIGN IN RESPONSABLE
  signIn(user: { password: string; username: string }): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, user)
      .pipe(
        catchError(this.handlError)
      );
  }

  // TEST HOMEPAGE ACCESS WITH TOKEN HEADER
  accessHome() {
    let tokenStr = 'Bearer ' + this.getToken();
    console.log(this.getToken())
    console.log(tokenStr);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get<any>(`${this.BASE_URL}/auth/home`, {headers})
      .pipe(
        catchError(this.handlError)
      );
  }


  // UTILS
  handlError(error: HttpErrorResponse): Observable<any> {
    // console.log(error.message);
    console.log(error);
    return throwError(' a data error occured please try again later.');
  }

}
