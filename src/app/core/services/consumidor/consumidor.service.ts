import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { Consumidor } from '../../models/pessoa';


@Injectable({
  providedIn: 'root'
})
export class ConsumidorService {

  consumidorUrl = `${API_CONFIG.baseUrl.prod}/service/consumidores`;

  constructor(private http: HttpClient) { }

  getConsumidorIdByEmail(email: string): Observable<number>{
    return this.http.get<number>(`${this.consumidorUrl}/email/${email}`)
  }

  findAll(): Observable<Consumidor[]> {
    return this.http.get<Consumidor[]>(this.consumidorUrl);
  }

  findById(id: number): Observable<Consumidor> {
    return this.http.get<Consumidor>(`${this.consumidorUrl}/${id}`);
  }

  create(consumidor: Consumidor){
    return this.http.post(this.consumidorUrl, consumidor);
  }

  update(id: number, consumidor: Consumidor) {
    return this.http.put(`${this.consumidorUrl}/${id}`, consumidor);
  }

  updateAdmin(id: number, empreendedor: Consumidor): Promise<any>{
    return this.http.put(`${this.consumidorUrl}/${id}`,empreendedor).toPromise();
  }

  delete(id: number): Observable<Consumidor>{
    return this.http.delete<Consumidor>(`${this.consumidorUrl}/${id}`).pipe(
      map(response => response),
    );
  }

    getConsumidorMesBy(id: number) {
    return this.http.get<Consumidor[]>(`${this.consumidorUrl}/mes/${id}`).pipe(
      map(response => response.length)
    );
  }
}
