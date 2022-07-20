import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Empreendedor } from '../../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class EmpreendedorService {

  private empreendedorUrl = `${API_CONFIG.baseUrl.prod}/service/empreendedores`;

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Empreendedor> {
    return this.http.get<Empreendedor>(`${this.empreendedorUrl}/${id}`);
  }

  findAll(): Observable<Empreendedor[]> {
    return this.http.get<Empreendedor[]>(this.empreendedorUrl);
  }

  getEmpreendorIdByEmail(email: string): Observable<number>{
      return this.http.get<number>(`${this.empreendedorUrl}/email/${email}`)
    }

  create(empreendedor: Empreendedor){
    return this.http.post(this.empreendedorUrl, empreendedor);
  }

  update(id: number, empreendedor: Empreendedor) {
    return this.http.put(`${this.empreendedorUrl}/${id}`, empreendedor);
  }
}
