import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Loja } from '../../models/loja';
import { Produto } from '../../models/produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  

  private baseUrl = "http://localhost:8080/service/produto";
  private lojaUrl = "http://localhost:8080/service/Lojas";





  constructor(private http: HttpClient) { }



  searchProdutos(KeyWord: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/buscarPorNome?name=${KeyWord}`).pipe(
      map(response => response)
    );
  }


  listaProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl).pipe(
      map(response => response)
    );
  }

  listaLojas(): Observable<Loja[]>{
    return this.http.get<Loja[]>(this.lojaUrl).pipe(
      map(response => response)
    );
  }


  getProdutoDetail(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response)
    );
  }

  getLojaDetail(id: number): Observable<Loja>{
    return this.http.get<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response)
    );
  }
}
