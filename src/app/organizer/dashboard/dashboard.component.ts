import { Component, OnInit } from '@angular/core';

import { OrganizerService } from './../organizer.service';

declare let $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../homepage/timeline.css']
})
export class DashboardComponent implements OnInit {

  eventos: any;

  constructor(private service: OrganizerService) { }

  endereco = {  'rua': 'rua_do_evento',   'bairro': 'bairro_do_evento',   'cidade': 'cidade_do_evento',   'estado': 'estado_do_evento',
  'cep': '50741-100',
  'numero': '92'}


  events = [{'nome': 'evento1', 'orçamento': '3000', 'quantidade_pessoas': '30', 'restricoes' : 'laticinio', 'status' : 'Aguardando pagamento',
    'descricao': 'um evento muito legal :)', 'data' : '2017-07-10T16:33:00Z', 'endereco' : this.endereco},
    {'nome': 'evento2', 'orçamento': '3000', 'quantidade_pessoas': '30', 'restricoes' : 'laticinio', 'status' : 'Cancelada',
      'descricao': 'um evento muito legal :)', 'data' : '2017-07-10T16:33:00Z', 'endereco' : this.endereco},
    {'nome': 'evento3', 'orçamento': '3000', 'quantidade_pessoas': '30', 'restricoes' : 'laticinio', 'status' : 'Paga',
      'descricao': 'um evento muito legal :)', 'data' : '2017-07-10T16:33:00Z', 'endereco' : this.endereco},
    {'nome': 'evento4', 'orçamento': '3000', 'quantidade_pessoas': '30', 'restricoes' : 'laticinio', 'status' : 'Debitado',
      'descricao': 'um evento muito legal :)', 'data' : '2017-07-10T16:33:00Z', 'endereco' : this.endereco}]

  ngOnInit() {
    $('.tap-target').tapTarget('open');

    this.service.getEventos(localStorage.getItem("token")).subscribe(
    res => {
      this.eventos = res
      console.log(res)
      // console.log(this.eventos);
      $.getScript('assets/modernizr.js');
      $.getScript("assets/main.js");
    });
  }

}
