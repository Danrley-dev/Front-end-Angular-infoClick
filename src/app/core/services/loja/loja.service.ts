import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Empreendedor } from '../../models/empreendedor';
import { Loja } from '../../models/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private lojaUrl = "http://localhost:8080/service/Lojas";

  constructor(private http: HttpClient) { }
  empreendedor?:Empreendedor;
  getLojaId(id: number): Observable<Loja>{
    return this.http.get<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response)
    );
  }

  create(loja: Loja ){
    return this.http.post(`${this.lojaUrl}/`, loja);
  }

}
