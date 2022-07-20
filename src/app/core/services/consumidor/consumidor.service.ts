import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  findById(id: number): Observable<number> {
    return this.http.get<number>(`${this.consumidorUrl}/${id}`);
  }
  create(consumidor: Consumidor){
    return this.http.post(this.consumidorUrl, consumidor);
  }

  update(id: number, consumidor: Consumidor) {
    return this.http.put(`${this.consumidorUrl}/${id}`, consumidor);
  }
}
