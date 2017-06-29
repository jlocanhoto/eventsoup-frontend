import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare let $:any

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() url = "";
  @Input() codigo = "";
  @Output() pronto = new EventEmitter();
  itens = []
  tempo: Date = new Date('2017-02-29T06:05:01');
  maisItens: boolean = false
  botao: boolean = false
  dia: number = this.tempo.getDate();
  mes:string;
  horario:string;
  statusEntrega:string;

  constructor(private fornecedor: FornecedorService) {
    this.itens = fornecedor.getItens();
    this.statusEntrega = 'Confirmado';
    this.timer()
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });

    this.getMes();
    this.getHorario();

  }

  getItens() {
    return this.itens
  }

  getHorario() {

    this.horario = this.tempo.getHours() + ':' + this.tempo.getMinutes();
    return  this.horario;
  }


  getMes() {
    switch (this.tempo.getMonth()) {
      case 1 :
        this.mes = 'JAN';
        break;
      case 2 :
        this.mes = 'FEV';
        break;
      case 3 :
        this.mes = 'MAR';
        break;
      case 4 :
        this.mes = 'ABR';
        break;
      case 5 :
        this.mes = 'MAI';
        break;
      case 6 :
        this.mes = 'JUN';
        break;
      case 7 :
        this.mes = 'JUL';
        break;
      case 8 :
        this.mes = 'AGO';
        break;
      case 9 :
        this.mes = 'SPT';
        break;
      case 10 :
        this.mes = 'OCT';
        break;
      case 11 :
        this.mes = 'NOV';
        break;
      case 12 :
        this.mes = 'DEZ';
        break;
      default :  this.mes = 'JAN';
    }
    return this.mes;
  }

  timer() {
    setTimeout(() => {
      this.tempo.setSeconds(this.tempo.getSeconds() - 1)
      this.timer()
    }, 1000)
  }

  getBotao() {
    return (this.botao) ? "Entregar":"Pronto";
  }

  click() {
    this.botao = !this.botao;
    this.pronto.emit({pronto: this.botao, codigo: this.codigo});
  }

  getTimer() {
    let tempo: string = "";
    tempo += ((this.tempo.getHours()<10)? "0" : "") + this.tempo.getHours().toString()
    tempo += ":" + ((this.tempo.getMinutes()<10)? "0" : "") + this.tempo.getMinutes().toString()
    tempo += ":" + ((this.tempo.getSeconds()<10)? "0" : "") + this.tempo.getSeconds().toString() + " h"
    return tempo
  }

  getDias() {
    return (this.tempo.getDay()<=0)? "" : this.tempo.getDay().toString() + " Dia(s) ";
  }

  ngOnInit() {
  }

}
