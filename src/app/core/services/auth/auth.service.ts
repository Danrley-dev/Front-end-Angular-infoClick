import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const creds = { email, password };
     return this.http.post(`${API_CONFIG.baseUrl.prod}/login`, creds, {
      responseType: 'text',
      observe: 'response',
    });
  }

  onLogin(token: string) {
    localStorage.setItem('token', token);
  }
}
