import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/Model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  _baseUrl = environment.apiUrl + 'Accounts/';
  private currentUser = new ReplaySubject<IUser>(1); //ReplaySubject to store the current user
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // getcurrentUserValue() {
  //   return this.currentUser.value;
  // }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUser.next(null); //If the token is null, set the current user to null
      return of(null); //Return an observable of null
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`); //Set the authorization header with the token
    return this.http.get<IUser>(this._baseUrl + 'get-current-user', { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token); //Store the token in local storage
            this.currentUser.next(user); //Update the current user
          }
        })
      )
  }

  login(value: any) {
    return this.http.post<IUser>(this._baseUrl + 'login', value)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          }
        })
      )
  }

  register(value: any) {
    return this.http.post<IUser>(this._baseUrl + 'register', value)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          }
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this._baseUrl + 'check-email-exist?email=' + email);
  }
}
