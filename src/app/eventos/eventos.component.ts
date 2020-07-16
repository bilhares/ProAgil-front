import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  title = "Eventos";
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  imagemLargura: number = 50;
  imagemMargem: number = 2;
  mostrarImagem: boolean = false;
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }

  filtrarEvento(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
    );
  }
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem
  }
  getEventos() {
    // this.http.get("https://localhost:44364/api/evento").subscribe(
    //   response => {
    //     console.log(response);
    //     this.eventos = response;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.eventoService.getEventos().subscribe(
      resp => {
        console.log(resp);
        this.eventos = resp;
      },
      err=>{
        console.log(err);        
      }
    );
  }
}
