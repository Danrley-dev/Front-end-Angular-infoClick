import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Empreendedor } from '../../models/empreendedor';
import { Loja } from '../../models/loja';

@Injectable({
  providedIn: 'root'
})
export class EmpreendedorService {

  private empreendedorUrl = `${API_CONFIG.baseUrl.prod}/service/empreendedores`;

  private lojaUrlId = "http://localhost:8080/service/Lojas";


  constructor(private http: HttpClient) { }


  getLojaId(id: number): Observable<Loja>{
    return this.http.get<Loja>(`${this.lojaUrlId}/find/${id}`).pipe(
      map(response => response)
    );
  }


  create(empreendedor: Empreendedor){
    return this.http.post(this.empreendedorUrl, empreendedor);
  }
}
