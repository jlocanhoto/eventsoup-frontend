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

	selectedPack	: number;

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

	pacotes = [this.pacoteFesta,
			   this.pacoteBebidas,
			   this.pacoteRegional,
			   this.pacoteVeg,
			   this.pacoteIntolAler];

	constructor (private eventService	: EventService,
				 private route			: ActivatedRoute,
				 private location		: Location,		 
				 private router			: Router		) { }

	ngOnInit(): void {
		//console.log(this.event)
		this.route.params
				  .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
				  .subscribe((event) => this.event = event);
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
	}

	selectAll(indexPackage) {
		let i = indexPackage;
		console.log('.chips_'+i);

		for (let j = 0; j < this.pacotes[i].items.length; j++)
		{
			this.pacotes[i].items[j].check = true;
			$('.chips_'+i).css({'background': '#a5d6a7', 'font-weight': 'bold'});
		}
	}

	getCheck(indexPackage, indexItem) {
		return this.pacotes[indexPackage].items[indexItem].check;
	}

	checkRequiredData(): string {
		let flag = false;
		let packages = 		[{"pacoteFesta":	this.pacoteFesta},
							{"pacoteBebidas":	this.pacoteBebidas},
							{"pacoteRegional":	this.pacoteRegional},
							{"pacoteVeg":		this.pacoteVeg}, 
							{"pacoteIntolAler":	this.pacoteIntolAler}];
		
		let selectedItems = [];

		for (let i = 0; i < packages.length; i++)
		{
			let key = Object.keys(packages[i])[0];
			let newSelection = [];

			for (let j = 0; j < packages[i][key].length; j++)
			{
				if(packages[i][key][j].check){
					newSelection.push(packages[i][key][j].nome)
					flag = true;
				}

			}
			let jsonSelection = {}
			jsonSelection[key] = newSelection;
			selectedItems.push( jsonSelection );
		}

		console.log(selectedItems);

		let str = "btn btn-success disabled";

		if (flag) {
			str = "btn btn-success";
		}

		return str;
	}

	selectPck(n: number): void {
		this.selectedPack = n;

		for (let i = 0; i < this.selPackClass.length; i++)
		{
			if (i === n) {
				if (this.selPackClass[i] === classesKits[i].after){
					this.selPackClass[i] = classesKits[i].before;
				}
				else {
					this.selPackClass[i] = classesKits[i].after;	
				}				
			}
			else {
				this.selPackClass[i] = classesKits[i].before;
			}
		}
	}

	addPackage(): void{
		
	}

	confirmDetails(): void {
		//console.log(this.event);
		//if (this.event !== undefined) {
			let event = JSON.parse(localStorage.newEvent)
			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
			this.router.navigate(path);
			//let path = ['/event', this.event.id, 'purchase'];
			//this.router.navigate(path);
		/*}
		else {
			console.log('EVENT NOT FOUND!');
		}*/
	}

	goBack(): void {
		this.location.back();
	}
}