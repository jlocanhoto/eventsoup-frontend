import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContratanteService {

  static token: string;

  constructor(private http: Http) { 
    console.log("criado");
  }

  getToken() {
    let url = 'https://eventsoup-backend.herokuapp.com/api-token-auth/';
    let headers = new Headers(
      { 'Content-Type': 'application/json' },

      );
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, { cpf_cnpj: "asdf", password: "a" }, options)
                .map( res => {
                  console.log("get");
                  let data = res.json();
                  ContratanteService.token = data.token;
                  console.log(ContratanteService.token);                  
                  console.log("get");
                  return data.token;
                }).catch( erro => {
                  console.log("erro");
                  console.log(erro);
                  console.log("erro");
                  return null;
                });
  }

  getEventos(token: string) {
    let url = 'https://eventsoup-backend.herokuapp.com/eventos/crud-eventos/';
    token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InNkamZzZEBzZmhnc2Quc2FzIiwidXNlcm5hbWUiOiJhc2RmIiwiZXhwIjoxNDk3OTEzMjI4LCJjcGZfY25waiI6ImFzZGYiLCJvcmlnX2lhdCI6MTQ5NzgyNjgyOH0.oi_7ekcFihIHsG1Q5yz1KwXY4ybgE3jMBYe1qNbhUAQ";
    console.log(token)
    console.log("token")
    let headers = new Headers(
      { 'Authorization': token },
      );
    let options = new RequestOptions({ headers: headers });
    console.log("get from " + url);
    return this.http.get(url, options)
                .map( res => {
                  // console.log("get");
                  let data = res.json();
                  console.log(data.results);
                  return data.results;
                });
  }
}
