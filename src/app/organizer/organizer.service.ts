import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizerService {

  serverUrl	 : string = 'https://eventsoup-backend.herokuapp.com';

  pacoteExpresso : any;
  pacoteCasual   : any;
  pacoteFesta    : any;

  pacotes        : any;

  packageIndex   : number = -1;

  constructor(private http: Http) { 
    console.log("criado");
  }

  getEventos(token: string) {
    let url = this.serverUrl + '/eventos/crud-eventos/';
    token = "JWT " + token;
    console.log(token)
    console.log("token")
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
                .map( res => {
                  // console.log("get");
                  let data = res.json();
                  // console.log(data.results);
                  return data.results;
                }).catch( erro => {
                    console.log(erro);
                    return Observable.throw(erro);
                });
  }

  criarEvento(token: string, data: any) {
    let url = this.serverUrl + '/eventos/crud-eventos/';
    token = "JWT " + token;
    console.log(token)
    console.log(data)
    console.log("token")
    let headers = new Headers({ 'Authorization': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options)
                .map( res => {
                  console.log("post");
                  let data = res.json();
                  return data;
                }).catch( erro => {
                    console.log(erro);
                    return Observable.throw(erro);
                });
  }

  get_redirect_code(data: any) : any{
    let url = this.serverUrl + '/pagseguro/comprar/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, data, options)
        .map(response => {
          // login successful if there's a jwt token in the response
          console.log(response)
          let resp = response.json();
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', resp.token);
          console.log(resp);
          return resp
        })
        .catch( erro =>{
          console.log(erro);
          return Observable.throw(erro);
        });
  }

  definePackages(qtd_pessoas) {
    this.pacoteExpresso = {"name": "Expresso",
                "img": "expresso.jpg",
                "desc": "Pausa para um lanche após uma reunião",
                "items": [
                  {"id":6, "nome": "Coxinha"        ,  "type": "salgado",  "qtd": qtd_pessoas, "precoUnitario": 0.2},
                  {"id":7, "nome": "Empada"        ,  "type": "salgado",  "qtd": qtd_pessoas*5, "precoUnitario": 0.15},
                  {"id":8, "nome": "Salgado de queijo"  ,  "type": "salgado",  "qtd": qtd_pessoas*5, "precoUnitario": 0.15}
                  //{"nome": "Descartáveis"        , "check": false},
                  //{"nome": "Mesas e cadeiras"      , "check": false}
                ]};
          
    this.pacoteCasual = {"name": "Casual",
                "img": "cerveja_artesanal.png",
                "desc": "Um bom momento para trocar uma ideia",
                "items": [
                  {"id":2, "nome": "Brigadeiro"      ,  "type": "doce",  "qtd": qtd_pessoas*3, "precoUnitario": 0.3},
                  {"id":3, "nome": "Surpresa de uva"    ,  "type": "doce",  "qtd": qtd_pessoas*3, "precoUnitario": 0.3},
                  {"id":4, "nome": "Refrigerante"      ,  "type": "liquido",  "qtd": qtd_pessoas*0.5, "precoUnitario": 5.5},
                  {"id":5, "nome": "Pão de queijo"    ,  "type": "salgado",  "qtd": qtd_pessoas*5, "precoUnitario": 0.2}
                  //"Outras bebidas"  ];
                ]};

    this.pacoteFesta = {"name": "Festa",
                "img": "brigadeiro.jpg",
                "desc": "Descontraia com os aniversáriantes do mês",
                "items": [
                  {"id":1, "nome": "Torta"        ,  "type": "doce",  "qtd": 1, "precoUnitario": 40}
                ]};


    this.pacoteCasual.items.push.apply(this.pacoteCasual.items, this.pacoteExpresso.items);
    this.pacoteFesta.items.push.apply(this.pacoteFesta.items, this.pacoteCasual.items);

    this.pacotes = [this.pacoteExpresso, this.pacoteCasual, this.pacoteFesta];

    return this.pacotes;
  }

  getSelectedPackage(index) {
    return this.pacotes[index];
  }

  currencyBRL(value: number): string {
    return value.toFixed(2).replace('.', ',').replace(/./g, function(c, i, a) {
      return i && c !== "," && ((a.length - i) % 3 === 0) ? ('.' + c) : c;
    });
  }
}
