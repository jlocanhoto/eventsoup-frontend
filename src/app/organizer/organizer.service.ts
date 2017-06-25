import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizerService {

  serverUrl	 : string = 'https://eventsoup-backend.herokuapp.com';

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

}
