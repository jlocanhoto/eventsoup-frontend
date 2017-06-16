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
  tempo: Date = new Date(1,0,0,0,0,10);
  maisItens: boolean = false
  botao: boolean = false

  constructor(private fornecedor: FornecedorService) { 
    this.itens = fornecedor.getItens();
    this.timer()
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }

  getItens() {
    if (this.itens.length > 2) {
      this.maisItens = true
      return this.itens.slice(0,2);
    }
    return this.itens
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
