
import { LoadingService } from './../loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, Subject } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Loja } from '../../models/loja';
import { Produto } from '../../models/produto';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  private baseUrl = "https://infoclick1.herokuapp.com/service/produto";
  private lojaUrl = "https://infoclick1.herokuapp.com/service/lojas";

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response),
    );
  }

  searchProdutos(KeyWord: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscarPorNome?name=${KeyWord}`).pipe(
      map(response => response),
    );
  }

  listaProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl).pipe(
      map(response => response),
    );
  }

  listaLojas(): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.lojaUrl).pipe(
      map(response => response)
    );
  }

  getProdutoDetail(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response),
    );
  }

  delete(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response),
    );
  }

  getLojaDetail(id: number): Observable<Loja> {
    return this.http.get<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response),
    );
  }

  getProdutoCategory(id: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscarPorCategoria?categoria=${id}`).pipe(
      map(response => response)
    );
  }

  create(id: number, produto: Produto): Promise<any> {
    return this.http.post(`${this.baseUrl}/${id}`, produto).toPromise();
  }


  update(id: number, produto: Produto): Promise<any> {
    return this.http.put(`${this.baseUrl}/${id}`, produto).toPromise();
  }

  getProdutoMesBy(id: number) {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscames/${id}`).pipe(
      map(response => response.length)
    );
  }

  ProdutoMes() {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscames`).pipe(
      map(response => response)
    );
  }

  // length produto mes
  get ProdutoMesLength() {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscames`).pipe(
      map(response => response.length)
    );
  }

   JulhoLength() {
    return this.http.get<Produto[]>(`${this.baseUrl}/buscames/7`).pipe(
      map(response => response.length)
    );
  }


  SemanaLength() {
    return this.http.get<Produto[]>(`${this.baseUrl}/busca-semana/30`).pipe(
      map(response => response.length)
    );
  }



}




