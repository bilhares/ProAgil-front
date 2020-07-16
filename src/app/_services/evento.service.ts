import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl = 'https://localhost:44364/api/evento/';
  // tokenHeader: HttpHeaders;

  constructor(private http: HttpClient) { 
    // this.tokenHeader = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
  }

  getEventos(): Observable<Evento[]> {
    // return this.http.get<Evento[]>(this.baseUrl, {headers: this.tokenHeader});
    return this.http.get<Evento[]>(this.baseUrl);
  }

}
