import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { Consumidor } from '../../models/pessoa';


@Injectable({
  providedIn: 'root'
})
export class ConsumidorService {

  consumidorUrl = `${API_CONFIG.baseUrl.prod}/service/consumidores`;
  
  constructor(private http: HttpClient) { }

  create(consumidor: Consumidor){
    return this.http.post(this.consumidorUrl, consumidor);
  }
}
