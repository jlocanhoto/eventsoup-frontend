import { Component, OnInit } from '@angular/core';

declare let $

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {


  pacotes = [
    {url: "http", codigo: 'XYd6'},
    {url: "http", codigo: 'Xcd5'},
    {url: "http", codigo: 'a5fR'},
    {url: "http", codigo: 'adf6'},
    {url: "http", codigo: 'uuhf'},
    {url: "http", codigo: 'sdf5'},
    {url: "http", codigo: 'ut89'},
  ]
  searchBox: string = "";
  allCards = [];
  cards = [];

  constructor() { 
    $( document ).ready(function(){
      $(".button-collapse").sideNav();
    })
    this.cards = this.allCards;
  }

  setCards() {
    this.cards = this.allCards.filter((card) => {
      if (card.toLocaleLowerCase().includes(this.searchBox.toLocaleLowerCase())) {
        return true;
      }
      return false;
    })
  }

  atualizaProntos(event) {
    console.log(event)
    if (event.pronto)
      this.allCards.push(event.codigo);
    else {
      this.allCards.splice(this.allCards.indexOf(event.codigo), 1);
    }
  }

  ngOnInit() {
  }

}
