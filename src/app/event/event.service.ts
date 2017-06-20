import { Injectable } 								from '@angular/core';
import { Headers, Http, Response, RequestOptions }	from '@angular/http';

import { Observable }								from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Event }									from './event';

@Injectable()
export class EventService {
	serverUrl	 : string = 'https://eventsoup-backend.herokuapp.com';
	getEventsUrl : string = this.serverUrl + '/eventos/crud-eventos/list-owner-eventos/';
	postEventUrl : string = this.serverUrl + '/eventos/crud-eventos/';
	deleEventUrl : string = this.serverUrl + '/eventos/crud-eventos/'; //+ slug do evento
	token 		 : string = localStorage.currentUser;

	//private eventsUrl = 'api/events';
	//private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	createAuthorizationHeader(headers: Headers) {
   	 	headers.append('Authorization',"JWT " + this.token);
  	}

  	createContentType(headers: Headers, type: string){
  		headers.append('Content-Type', type);
  		//console.log(headers);
  	}

  	/*
	getEvents(): Promise<Event[]> {
		return this.http.get(this.eventsUrl)
				   .toPromise()
				   .then(response => response.json().data as Event[])
				   .catch(this.handleError);
	}
	*/

	getEvents(): Observable<Event[]> {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		
		return this.http.get(this.getEventsUrl, options)
			.map(this.extractData)
			.catch(this.handleError);
	}
	/*
	getEvent(id: number): Promise<Event> {
		const url = `${this.eventsUrl}/${id}`;

		return this.http.get(url)
				   .toPromise()
				   .then(response => response.json().data as Event)
				   .catch(this.handleError);
	}
	*/
	// Walber code:
	getEvent(id: number): Observable<Event> {
		return this.getEvents()
				   .map((events) => events.find(event => event.id === id));
	}
	
	/*
	create(title: string): Promise<Event> {
		return this.http
				   .post(this.eventsUrl, JSON.stringify({title: title}), {headers: this.headers})
				   .toPromise()
				   .then(response => response.json().data as Event)
				   .catch(this.handleError);
	}
	*/
	create(event: Event): Observable<Event> {
		var headers = new Headers();
		this.createAuthorizationHeader(headers);
		this.createContentType(headers, "application/json");

		var options = new RequestOptions({ headers: headers });
		 	
		//console.log(event)

		var json = {
			"nome" : 				event.title,
			"data": 				event.date,
			"endereco":				event.place,
			"orcamento":			event.budget,
			"quantidade_pessoas": 	event.qtdPeople,
		}
		/*
		if (event.restrictions !== ""){
			json["restricoes"] = event.restrictions;
		}
		*/

		return this.http.post(this.postEventUrl, JSON.stringify(json), options)
					.map(res => res.json().data as Event)
					.catch(this.handleError);
	}

	private handleError(error: Response | any): any {
		//console.error('An error occurred', error); // for demo purposes only
		//return Promise.reject(error.message || error);
		return Observable.throw(error);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.results || {};
	}

	/*
	update(event: Event): Promise<Event> {
		const url = `{$this.eventsUrl}/${event.id}`;

		return this.http
				   .put(url, JSON.stringify(event), {headers: this.headers})
				   .toPromise()
				   .then(() => event)
				   .catch(this.handleError);
	}*/

	delete(slug: string): Promise<void> {
		const url = this.deleEventUrl + slug + '/';

		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		//this.createContentType(headers, "application/x-www-form-urlencoded");
		let options = new RequestOptions({ headers: headers, withCredentials: true});
	
		return this.http.delete(url, options)
				.toPromise()
				.then(() => null)
				.catch(this.handleError);
	}
	
}