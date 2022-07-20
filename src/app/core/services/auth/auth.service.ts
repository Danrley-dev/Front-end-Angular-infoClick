import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { retry } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { PessoaService } from '../pessoa/pessoa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private pessoasService: PessoaService) {}

  emailUser?: string;
  roleUser?: string;
  userAdmin?: boolean;

  login(email: string, password: string) {
    const creds = { email, password };
    return this.http.post(`${API_CONFIG.baseUrl.prod}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  userInfo() {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
      this.roleUser = decoded.Perfil;
    }

    return this.pessoasService.findByEmail(this.emailUser!).pipe(retry(3));
  }

  userRole() {
    this.userInfo().subscribe((has) => {
      let array: any[] = [];
        array = has.perfil!;
          if (array.includes('ADMIN')) {
            return this.roleUser = 'Admin';
          } else if(array.includes('CONSUMIDOR')) {
            return this.roleUser = 'Consumidor';
          } else if(array.includes('EMPREENDEDOR')) {
            return this.roleUser = 'Empreendedor';
          } else {
            return null;
          }
        });
  }

  isAdmin() {
    this.userInfo().subscribe(res => {
      const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
        if (res.perfil![key] == 'ADMIN') {
          return true
        }
        return false;
      })
      this.userAdmin = perfilsBolean.includes(true);

   })
  }

  jwt = new JwtHelperService();

  get isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token !== null) {
      const decoded = this.jwt.decodeToken(token);
      this.emailUser = decoded.sub;
      this.roleUser = decoded.Perfil;
      return !this.jwt.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();

  }

  getEmail() {
    return this.emailUser;
  }

  getTokenExpirationDate() {
    let token = localStorage.getItem('token');

    if (token !== null){
      return this.jwt.getTokenExpirationDate(token);
    }
    return null;
  }

  onLogin(token: string) {
    localStorage.setItem('token', token);
  }

}
