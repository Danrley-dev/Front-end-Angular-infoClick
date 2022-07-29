import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  updateAdmin(id: number, empreendedor: Empreendedor): Promise<any>{
    return this.http.put(`${this.empreendedorUrl}/${id}`,empreendedor).toPromise();
  }

  delete(id: number): Observable<Empreendedor>{
    return this.http.delete<Empreendedor>(`${this.empreendedorUrl}/${id}`).pipe(
      map(response => response),
    );
  }

      getEmpreendedorMesBy(id: number) {
    return this.http.get<Empreendedor[]>(`${this.empreendedorUrl}/mes/${id}`).pipe(
      map(response => response.length)
    );
  }

}
