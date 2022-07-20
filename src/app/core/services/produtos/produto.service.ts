
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


  private baseUrl = "http://localhost:8080/service/produto";
  private lojaUrl = "http://localhost:8080/service/lojas";

  constructor(private http: HttpClient) { }

  searchProdutos(KeyWord: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/buscarPorNome?name=${KeyWord}`).pipe(
      map(response => response),
    );
  }

  listaProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl).pipe(
      map(response => response),
    );
  }

  listaLojas(): Observable<Loja[]>{
    return this.http.get<Loja[]>(this.lojaUrl).pipe(
      map(response => response)
    );
  }


  getProdutoDetail(id: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response),
    );
  }

  delete(id: number): Observable<Produto>{
    return this.http.delete<Produto>(`${this.baseUrl}/${id}`).pipe(
      map(response => response),
    );
  }

  getLojaDetail(id: number): Observable<Loja>{
    return this.http.get<Loja>(`${this.lojaUrl}/find/${id}`).pipe(
      map(response => response),
    );
  }

  getProdutoCategory(id: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/buscarPorCategoria?categoria=${id}`).pipe(
      map(response => response)
    );
  }

  create(id: number, produto: Produto):  Promise<any>{
    return this.http.post(`${this.baseUrl}/${id}`,produto).toPromise();
  }



  }

 


