import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get("https://localhost:44364/api/evento").subscribe(
      response => {
        console.log(response);        
        this.eventos = response;
      },
      err => {console.log(err);
      }
    );
  }
}
