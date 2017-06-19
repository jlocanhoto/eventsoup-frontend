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

	pacoteFesta		: any = {"name": "Pacote Festa",
							 "img": "salgados_doces.jpg",
							 "items": [
								{"nome": "Salgados"					, "check": false},
								{"nome": "Doces"					, "check": false},
								{"nome": "Tortas"					, "check": false},
								{"nome": "Refrigerantes"			, "check": false},
								//{"nome": "Descartáveis"				, "check": false},
								//{"nome": "Mesas e cadeiras"			, "check": false}
							]};
				
	pacoteBebidas	: any = {"name": "Pacote Bebidas",
							 "img": "cerveja_artesanal.png",
							 "items": [
								{"nome": "Cervejas"					, "check": false},
								{"nome": "Sucos"					, "check": false},
								{"nome": "Cafés"					, "check": false},
								{"nome": "Chás"						, "check": false}
								//"Outras bebidas"	];
							]};


	pacoteRegional	: any = {"name": "Pacote Regional",
							 "img": "bolo_de_rolo.jpg",
							 "items": [
								{"nome": "Comidas típicas"				, "check": false},
								{"nome": "Comidas e bebidas culturais"	, "check": false}
							]};							;

	pacoteVeg		: any = {"name": "Pacote Vegetariano e Vegano",
							 "img": "vegan_burguers.jpg",
							 "items": [
								{"nome": "Salgados"						, "check": false},
								{"nome": "Doces"						, "check": false},
								{"nome": "Tortas" 						, "check": false},
								{"nome": "Bebidas"						, "check": false},
								{"nome": "Sobremesas"					, "check": false},
								{"nome": "Frutas"						, "check": false}
							]};

	pacoteIntolAler	: any = {"name": "Pacote Intolerantes e Alérgicos",
							 "img": "bolo_sem_gluten.jpg",
							 "items": [
								{"nome": "Doces sem lactose"			, "check": false},
								{"nome": "Tortas sem lactose"			, "check": false},
								{"nome": "Salgados sem glúten"			, "check": false}
							]};

	pacotes			: any = [this.pacoteFesta,
							 this.pacoteBebidas,
							 this.pacoteRegional,
							 this.pacoteVeg,
							 this.pacoteIntolAler];

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
	}

	ngAfterViewInit(): void {
		$('.chip').css('cursor', 'pointer');
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
		let flag = (this.qtySelPacks > 0);

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
			localStorage.setItem('selectedPacks', JSON.stringify(this.selectedPacks));

			if (localStorage.newEvent !== undefined) {
				let event = JSON.parse(localStorage.newEvent)

				//event.packageID = this.selectedPack.toString();
				//localStorage.setItem('newEvent', JSON.stringify(event));

				//let path = ['/home'];
				let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
				this.router.navigate(path);
				//let path = ['/event', this.event.id, 'purchase'];
				//this.router.navigate(path);
			}
		/*}
		else {
			console.log('EVENT NOT FOUND!');
		}*/
	}

	goBack(): void {
		this.location.back();
	}
}