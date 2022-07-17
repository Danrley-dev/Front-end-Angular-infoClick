import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  emailUser?: string;
  roleUser?: string;

  login(email: string, password: string) {
    const creds = { email, password };
    return this.http.post(`${API_CONFIG.baseUrl.prod}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  jwt = new JwtHelperService();

  get isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
      return !this.jwt.isTokenExpired(token);
    }
    return false;
  }
  logout() {
    localStorage.clear();

  }

  // geet email do usuario logado
  getEmail() {
    return this.emailUser;
  }



  onLogin(token: string) {
    localStorage.setItem('token', token);
  }

}
