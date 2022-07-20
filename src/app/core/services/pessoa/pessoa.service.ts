import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Pessoa } from '../../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = `${API_CONFIG.baseUrl.prod}/service/pessoa`;

  constructor(private http: HttpClient) {}

  findByEmail(email: string) {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${email}`);
  }

  findAllPessoas() {
    return this.http.get<Pessoa[]>(this.pessoaUrl);
  }



}
