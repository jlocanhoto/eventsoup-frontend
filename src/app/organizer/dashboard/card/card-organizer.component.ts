import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit   } from '@angular/core';

declare let $;
@Component({
  selector: 'app-card2',
  templateUrl: './card-organizer.component.html',
  styleUrls: ['./card-organizer.component.css']
})
export class CardOrganizerComponent implements OnInit, AfterViewInit {

  @Input() evento: any;
  @Input() id: any;
  mes: string;
  dia: number;
  horario: string;
  dataD: Date;
  valor: string;
  constructor() {
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });


  }

  ngOnInit() {
    this.getMes();
  }

  ngAfterViewInit() {
    this.getClass();
  }
  getClass() {
    switch (this.evento.status) {
      case 'Aguardando pagamento' :
        this.setColor('blue');
        break;
      case 'Paga' :
        this.setColor('green');
        break;
      case 'Cancelada' :
        this.setColor('red');
        break;
    }
  }


  setColor(cor: string) {
    this.valor = 'card' + this.id;
    document.getElementById(this.valor).classList.remove('blue');
    document.getElementById(this.valor).classList.add(cor);
  }

  getMes() {
    this.dataD = new Date(this.evento.data);
    this.dataD.setHours(this.dataD.getHours() + 3 , this.dataD.getMinutes(), 0, 0);
    switch (this.dataD.getMonth() + 1) {
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

    this.dia = this.dataD.getDate();
    this.horario = ' ' + this.dataD.getHours() + ' : ' + this.dataD.getMinutes();
  }


}
