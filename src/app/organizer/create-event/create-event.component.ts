import { Component }			from '@angular/core';
import { Router } 				from '@angular/router';
import { Location }				from '@angular/common';
import { FormsModule }   		from '@angular/forms';

import { Event } 				from '../../event/event';
import { EventService }			from '../../event/event.service';

declare var $ : any;	// jQuery variable

@Component({
	selector: 'create-event',
	templateUrl: './create-event.component.html',
	styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

	newEvent		: Event;

	title			: string = "";
	//date			: Date;
	date			: any;	// 2017-07-13T9:00
	timeBegin		: string = "";
	timeEnd			: string = "";
	place			: string = "";
	budget			: string = "";
	bairro			: string = "";
	rua				: string = "";
	numero			: number;

	qtd				: number;

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
				console.log(that.date)
			}
		});

		// jquery-mask-plugin
		let options =  {
			onChange: function(money) {
				if (money.length > 3) {
					that.budget = money;
					//console.log(that.budget)
				}
				else {
					that.budget = "";
				}
			},
			reverse: true
		};
		
		$('.money').mask("#.##0,00", options);
	}
	private moneyNotation(money: string): number {
		return parseFloat(money.replace(".",";").replace(",",".").replace(";",","));
	}

	createEvent(): void {
		this.router.navigate(['/organizer', 'event', 'packages'], {
			queryParams: {
				"data": this.date.obj,
				"quant_pessoas": this.qtd,
				"bairro": this.bairro,
				"rua": this.rua
			}
		});
	}
	checkRequiredData(): string {
		let flag = true;
		flag = flag && ($('.datepicker').val() !== "");
		flag = flag && (this.rua !== "");
		flag = flag && (this.bairro !== "");
		flag = flag && (this.numero !== 0);
		flag = flag && (this.qtd !== 0);

		let str = "btn disabled";

		if (flag) {
			str = "btn";
		}

		this.requiredData = flag;

		return str;
	}

	// goBack(): void {
	// 	this.location.back();
	// }
}