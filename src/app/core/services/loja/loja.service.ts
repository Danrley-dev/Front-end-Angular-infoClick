import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Loja } from '../../models/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private lojaUrl = "https://infoclick1.herokuapp.com/service/lojas";

  constructor(private http: HttpClient) { }

  listaLojas(): Observable<Loja[]>{
    return this.http.get<Loja[]>(this.lojaUrl);
  }

  getLojaId(id: number): Observable<Loja>{
    return this.http.get<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response)
    );
  }

  create(idEmpreendedor: number,loja: Loja ): Promise<any>{
    return this.http.post(`${this.lojaUrl}/${idEmpreendedor}`, loja).toPromise();
  }

  findLojaById(email: string): Observable<number>{
    return this.http.get<number>(`${this.lojaUrl}/findLojaID/${email}`)
  }

  delete(id: number): Observable<Loja>{
    return this.http.delete<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response),
    );
  }

  update(id: number, loja: Loja) {
    return this.http.put(`${this.lojaUrl}/${id}`, loja);
  }

}
