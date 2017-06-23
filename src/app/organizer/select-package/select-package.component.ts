import { Component, Input, OnInit }			from '@angular/core';
import { ActivatedRoute, Params, Router }	from '@angular/router';
import { Location }							from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Event } 							from '../../event/event';
import { EventService }						from '../../event/event.service';

declare var $ : any;

const classesKits = [
	{before: "panel panel-info"   , after: "panel panel-primary"},
	{before: "panel panel-warning", after: "panel panel-yellow"},
	{before: "panel panel-danger" , after: "panel panel-red"},
	{before: "panel panel-success", after: "panel panel-green"},
	{before: "panel panel-default", after: "panel panel-black"}
];

@Component({
	selector: 'select-package',
	templateUrl: './select-package.component.html',
	styleUrls: ['./select-package.component.css']
})
export class SelectPackageComponent implements OnInit {
	@Input() event	: Event;	//recebe evento do pai, create-event

	selPackClass 	: string[] 	= ["panel panel-primary",
								   "panel panel-yellow",
								   "panel panel-red",
								   "panel panel-green",
								   "panel panel-black"];

	colors		 	: string[] 	= ["blue lighten-4",
								   "yellow lighten-4",
								   "red lighten-4",
								   "green lighten-4",
								   "brown lighten-4"];

	peopleQty		: number[] 	= [1, 0, 0, 0, 0, 0];
	timeEating		: number 	= 0;
	newEvent		: any = JSON.parse(localStorage.newEvent);

	pacoteExpresso		: any = {"name": "Expresso",
							 "img": "expresso.jpg",
							 "desc": "Pausa para um lanche após uma reunião",
							 "items": [
								{"nome": "Coxinhas"				,	"type": "salgado",	"qtd": this.newEvent.qtdPeople*5, "precoUnitario": 0.2},
								{"nome": "Empadas de frango"				,	"type": "salgado",	"qtd": this.newEvent.qtdPeople*5, "precoUnitario": 0.15},
								{"nome": "Salgadinhos de queijo"	,	"type": "salgado",	"qtd": this.newEvent.qtdPeople*5, "precoUnitario": 0.15}
								//{"nome": "Descartáveis"				, "check": false},
								//{"nome": "Mesas e cadeiras"			, "check": false}
							]};

	pacoteCasual	: any = {"name": "Casual",
							 "img": "cerveja_artesanal.png",
							 "desc": "Um bom momento para trocar uma ideia",
							 "items": [
								{"nome": "Pães de queijo"		,	"type": "salgado",	"qtd": this.newEvent.qtdPeople*5, "precoUnitario": 0.2},
								{"nome": "Brigadeiros"			,	"type": "doce",	"qtd": this.newEvent.qtdPeople*3, "precoUnitario": 0.3},
								{"nome": "Surpresas de uva"		,	"type": "doce",	"qtd": this.newEvent.qtdPeople*3, "precoUnitario": 0.3},
								{"nome": "Refrigerantes"			,	"type": "liquido",	"qtd": this.newEvent.qtdPeople*0.5, "precoUnitario": 5.5}
								//"Outras bebidas"	];
							]};

	pacoteFesta	: any = {"name": "Festa",
							 "img": "brigadeiro.jpg",
							 "desc": "Descontraia com os aniversáriantes do mês",
							 "items": [
								{"nome": "Torta"				,	"type": "doce",	"qtd": 1, "precoUnitario": 40}
							]};

/*
	pacoteEmpresarial		: any = {"name": "Empresarial",
							 "img": "vegan_burguers.jpg",
							 "desc": "Receba seu convidade VIP com um evento requintado",
							 "items": [
								{"nome": "Salgados"						, "check": false},
								{"nome": "Doces"						, "check": false},
								{"nome": "Tortas" 						, "check": false},
								{"nome": "Bebidas"						, "check": false},
								{"nome": "Sobremesas"					, "check": false},
								{"nome": "Frutas"						, "check": false}
							]};
*/


	selectedPack	: any = {};

	pacotes			: any = [this.pacoteExpresso,
							 this.pacoteCasual,
							 this.pacoteFesta];
							 //this.pacoteEmpresarial];

	selectedPacks	: any = [];
	qtySelPacks		: number = 0;

	constructor (private eventService	: EventService,
				 private route			: ActivatedRoute,
				 private location		: Location,
				 private router			: Router		) {

					for(let i = 0; i < this.pacotes.length; i++)
					{
						this.selectedPacks.push({"name": this.pacotes[i].name,
												"items": [] });
					}

					//console.log(this.selectedPacks);
				}

	ngOnInit(): void {
		//console.log(this.event)
		/*this.route.params
				  .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
				  .subscribe((event) => this.event = event);
		*/

		this.pacoteCasual.items.push.apply(this.pacoteCasual.items, this.pacoteExpresso.items);
		this.pacoteFesta.items.push.apply(this.pacoteFesta.items, this.pacoteCasual.items);

		console.dir(this.newEvent);
	}

	ngAfterViewInit(): void {
		$('.chip').css('cursor', 'pointer');
	}


	selectPackage(pkg){
		console.log(pkg)
		this.selectedPack = pkg;

	}

	selectItem(event, indexPackage, indexItem) {
		/*
		console.log(this.pacotes[indexPackage].name,
					this.pacotes[indexPackage].items[indexItem].nome);
		*/
		var target = event.target || event.srcElement || event.currentTarget;
		if (this.pacotes[indexPackage].items[indexItem].check === false) {
			$(target).css({'background': '#a5d6a7', 'font-weight': 'bold'});
			this.pacotes[indexPackage].items[indexItem].check = true;
		}
		else {
			$(target).css({'background': '', 'font-weight': ''});
			this.pacotes[indexPackage].items[indexItem].check = false;
		}

		this.getSelectedItems();
	}

	selectAll(indexPackage) {
		let i = indexPackage;
		//console.log('.chips_'+i);

		for (let j = 0; j < this.pacotes[i].items.length; j++)
		{
			this.pacotes[i].items[j].check = true;
			$('.chips_'+i).css({'background': '#a5d6a7', 'font-weight': 'bold'});
		}

		this.getSelectedItems();
	}

	getCheck(indexPackage, indexItem) {
		return this.pacotes[indexPackage].items[indexItem].check;
	}

	checkRequiredData(): string {
		let flag = (this.selectedPack.items !== undefined);

		let str = "btn disabled";

		if (flag) {
			str = "btn";
		}

		return str;
	}

	getSelectedItems(): void {
		for (let i = 0; i < this.pacotes.length; i++)
		{
			for (let j = 0; j < this.pacotes[i].items.length; j++)
			{
				let flag = this.pacotes[i].items[j].check;
				let name = this.pacotes[i].items[j].nome;
				let index = this.selectedPacks[i].items.indexOf(name);

				if (flag) {
					if (index === -1) {
						this.selectedPacks[i].items.push(name);
						this.qtySelPacks++;
					}
				}
				else {
					if (index !== -1) {
						this.selectedPacks[i].items.splice(index, 1);
						this.qtySelPacks--;
					}
				}
			}
		}

		//console.log(this.selectedPacks);
	}

	confirmDetails(): void {
		//console.log(this.event);
		//if (this.event !== undefined) {
			localStorage.setItem('selectedPack', JSON.stringify(this.selectedPack));

			if (localStorage.newEvent !== undefined) {
				let event = JSON.parse(localStorage.newEvent)

				//event.packageID = this.selectedPack.toString();
				//localStorage.setItem('newEvent', JSON.stringify(event));

				//let path = ['/home'];
				let path = ['/organizer', 'event', event.id, 'confirmation'];
				console.log(path)
				//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
				this.router.navigate(path);
				//let path = ['/event', this.event.id, 'purchase'];
				//this.router.navigate(path);
			}
		/*}
		else {
			console.log('EVENT NOT FOUND!');
		}*/
	}

	calcBudget(){
		let budget = 0;
		if(this.selectedPack.items !== undefined)
		{
			for(let i = 0; i < this.selectedPack.items.length; i++){
				budget += this.selectedPack.items[i].qtd * this.selectedPack.items[i].precoUnitario;
			}
		}

		return budget;
	}

	goBack(): void {
		this.location.back();
	}
}
