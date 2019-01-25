import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  public username: string;
  userid: number=0;
  url = 'http://localhost:8081';
  constructor(
    private router: Router,
    private http: Http, 
    private authHttp: AuthHttp) { }

  login(credentials) {
    return this.http.post(this.url+'/auth',credentials)
    .map(response => {
      let result = response.json();
      if (result && result.token) {
        localStorage.setItem('token',result.token);
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  isLogged(){
    return tokenNotExpired();
  }

  get currentUser() {
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if (!token) return null;
    return jwtHelper.decodeToken(token);
  }

  findAllUsers() {
    return this.authHttp.get(this.url + '/allUsers')
    .map(response => {
        console.log(response.json());
        return response.json();
    });
  }
}
