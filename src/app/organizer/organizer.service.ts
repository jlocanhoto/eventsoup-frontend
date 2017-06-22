import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizerService {

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
                  OrganizerService.token = data.token;
                  console.log(OrganizerService.token);                  
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
    token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImNvbnRyYXRhbnRlQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoiMTIzNDU2Nzg5OTgiLCJleHAiOjE0OTgyNDY5MTgsImNwZl9jbnBqIjoiMTIzNDU2Nzg5OTgiLCJvcmlnX2lhdCI6MTQ5ODE2MDUxOH0.mtQnKA6hXtojXxBM9oVhrC2uzhbBttMxhjv5QPxB8D4";
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
                  // console.log(data.results);
                  return data.results;
                });
  }

}
