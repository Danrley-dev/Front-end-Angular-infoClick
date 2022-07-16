import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Empreendedor } from '../../models/empreendedor';

@Injectable({
  providedIn: 'root'
})
export class EmpreendedorService {

  private empreendedorUrl = `${API_CONFIG.baseUrl.prod}/service/empreendedores`;

  constructor(private http: HttpClient) { }

  getEmpreendorIdByEmail(email: string): Observable<number>{
      return this.http.get<number>(`${this.empreendedorUrl}/email/${email}`)
    }

  create(empreendedor: Empreendedor){
    return this.http.post(this.empreendedorUrl, empreendedor);
  }
}
