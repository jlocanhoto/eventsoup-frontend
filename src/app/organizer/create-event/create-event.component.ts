import { Component }			from '@angular/core';
import { Router } 				from '@angular/router';
import { Location }				from '@angular/common';

import { Event } 				from '../../event/event';
import { EventService }			from '../../event/event.service';

declare var $ : any;	// jQuery variable

@Component({
	selector: 'create-event',
	templateUrl: './create-event.component.html'
})
export class CreateEventComponent {
	//events			: Event[];
	//restrictStrs 	: string[] = [ 'Vegetariano', 'Regional', 'Intolerâncias', 'Alergias' ];
	//restrictStrs 	: string[] = [ 'Vegetariano', 'Regional' ];
	
	newEvent		: Event;

	title			: string = "";
	//date			: Date;
	date			: any;	// 2017-07-13T9:00
	timeBegin		: string = "";
	timeEnd			: string = "";
	place			: string = "";
	budget			: string = "";

	specificQty		: number = 0;


	//restrictions	: boolean[];
	/*
	qtyPeopleOpts	: any[] = [{i: 0, qty: {min:   1, max:  25}, text: "Até 25 pessoas"   			},
							   {i: 1, qty: {min:  25, max:  50}, text: "Entre 25 e 50 pessoas"  	},
							   {i: 2, qty: {min:  50, max: 100}, text: "Entre 50 e 100 pessoas" 	},
							   {i: 3, qty: {min: 100, max: 200}, text: "Entre 100 e 200 pessoas"	},
							   {i: 4, qty: {min:  -1, max:  -1}, text: "Informar outra quantidade"}];

	option			: any = undefined;
	*/
	requiredData	: boolean = false;

	constructor(private location		: Location,
				private router			: Router,
				private eventService	: EventService) {

	}

	ngAfterContentInit() {
		// datepicker
		// Brazilian Portuguese translation
		$.extend( $.fn.pickadate.defaults, {
		    monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
		    monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
		    weekdaysFull: [ 'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado' ],
		    weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb' ],
		    today: 'hoje',
		    clear: 'limpar',
		    close: 'fechar',
		    format: 'dddd, d !de mmmm !de yyyy',
		    formatSubmit: 'yyyy/mm/dd'
		});

		var that = this;

		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 10, // Creates a dropdown of 15 years to control year
			onClose: function() {
				that.date = this.get('select');
				//console.log(that.date)
			}
		});

		// jquery-mask-plugin
		let options =  {
			onChange: function(money) {
				that.budget = money;
				console.log(that.budget)
			},
			reverse: true
		};
		
		$('.money').mask("#.##0,00", options);
	}
	/*
	checkBoxBehaviour(current: any): void {
		var inputs = document.getElementsByTagName('input');

		for(let i = 0; i < inputs.length; i++){
			if(inputs[i].type === 'checkbox' && inputs[i].className !== current)
				inputs[i].checked = false;
		}
	}

	getRestrictions(): string {
		var restrictions = "";

		var inputs = document.getElementsByTagName('input');

		for(let i = 0; i < inputs.length; i++){
			if(inputs[i].type === 'checkbox' && inputs[i].checked)
				restrictions = inputs[i].className.toLowerCase();;
		}

		return restrictions;
	}
	*/
	addEvent(cb: (that : any) => void): void {
		var p1 = new Promise((resolve, reject) => {
			this.eventService.getEvents().subscribe((events) => {
				//console.log(events);
				//console.log(events.length);
				this.newEvent.id = events.length;
				/*this.eventService.create(this.newEvent).subscribe((events) => {
					resolve(this);
				});*/
				//console.log(this.newEvent);
				//console.log(EVENTS.length);
				resolve(this);
				
			})
		});

		p1.then((that) => { cb(that); });
	}

	/*
	addEvent(): void {
		this.newEvent.id = this.events.length;

		this.events.push(this.newEvent);
		//console.log(events);
	}
	*/

	private moneyNotation(money: string): number {
		return parseFloat(money.replace(".",";").replace(",",".").replace(";",","));
	}

	createEvent(): void {
		this.newEvent 				= new Event();
		//this.newEvent.title 		= this.title;
		this.newEvent.date			= this.date;
		//this.newEvent.time			= {begin: this.timeBegin, end: this.timeEnd};
		//this.newEvent.place			= this.place;

		this.newEvent.budget		= this.moneyNotation(this.budget);
		//this.newEvent.restrictions 	= this.getRestrictions();
		/*
		if (this.specificQty !== 0) {
			this.option.qty.min = this.option.qty.max = this.specificQty;
		}
		*/
		this.newEvent.qtyPeople		= 1;


		this.addEvent(function(that) {
			let json = {
				"id": that.newEvent.id,
				//"title": that.newEvent.title,
				"date": that.newEvent.date,
				//"place": that.newEvent.place,
				"budget": that.newEvent.budget,
				//"restrictions": that.newEvent.restrictions,
				//"packageID": ''
			};

			localStorage.setItem('newEvent', JSON.stringify(json));

			let path = ['/home', {outlets: {spa: ['event', that.newEvent.id, 'packages']}}];
			//let path = ['/home'];
			that.router.navigate(path);
		});


		/*
		let path = ['/event', this.newEvent.id, 'packages'];
		
		this.router.navigate(path);
		*/
	}
	/*
	checkOptionOther(): boolean {
		return ((this.option !== undefined) && (this.option.i === this.qtyPeopleOpts.length-1));
	}
	*/
	checkRequiredData(): string {
		let flag = true;
		//flag = flag && (this.title !== "");
		//flag = flag && (this.date !== "");
		flag = flag && ($('.datepicker').val() !== "");
		//flag = flag && (this.place !== "");
		//flag = flag && (this.budget !== "");
		flag = flag && ($('.money').val() !== "");
		//flag = flag && (this.option !== undefined);

		let str = "btn disabled";

		if (flag) {
			str = "btn";
		}

		this.requiredData = flag;

		return str;
	}

	goBack(): void {
		this.location.back();
	}
}