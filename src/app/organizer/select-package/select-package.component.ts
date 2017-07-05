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
	newEvent		: any;


	pacoteExpresso		: any = {"name": "Expresso",
							 "img": "expresso.jpg",
							 "desc": "Pausa para um lanche após uma reunião",
							 "items": [
								{"nome": "Coxinha"				,	"type": "salgado",	"qtd": 0, "precoUnitario": 0.2},
								{"nome": "Empada"				,	"type": "salgado",	"qtd": 0, "precoUnitario": 0.15},
								{"nome": "Salgado de queijo"	,	"type": "salgado",	"qtd": 0, "precoUnitario": 0.15}
							//{"nome": "Descartáveis"				, "check": false},
								//{"nome": "Mesas e cadeiras"			, "check": false}
							]};

	pacoteCasual	: any = {"name": "Casual",
							 "img": "cerveja_artesanal.png",
							 "desc": "Um bom momento para trocar uma ideia",
							 "items": [
								{"nome": "Brigadeiro"			,	"type": "doce",	"qtd": 0*3, "precoUnitario": 0.3},
								{"nome": "Surpresa de uva"		,	"type": "doce",	"qtd": 0*3, "precoUnitario": 0.3},
								{"nome": "Refrigerante"			,	"type": "liquido",	"qtd": 0*0.5, "precoUnitario": 5.5},
								{"nome": "Pão de queijo"		,	"type": "salgado",	"qtd": 0*5, "precoUnitario": 0.2}
								//"Outras bebidas"	];
							]};

	pacoteFesta	: any = {"name": "Festa",
							 "img": "brigadeiro.jpg",
							 "desc": "Descontraia com os aniversáriantes do mês",
							 "items": [
								{"nome": "Torta"				,	"type": "torta",	"qtd": 1, "precoUnitario": 40}
							]};


	selectedPack	: any = {};

	pacotes			: any = [this.pacoteExpresso,
							 this.pacoteCasual,
							 this.pacoteFesta];
							 //this.pacoteEmpresarial];

	selectedPacks	: any = [];
	qtySelPacks		: number = 0;

	data:Date;
	qtd_pessoas: number;
	bairro_q: string;
	rua_q:string;
	orcamento: number;

	constructor (private eventService	: EventService,
				 private route			: ActivatedRoute,
				 private location		: Location,
				 private router			: Router		) {	}

	ngOnInit(): void {
		// pega os dados informados na página anterior
		this.route.queryParams.subscribe(
			query => {
				this.data = new Date(query["data"])
				this.qtd_pessoas = query["quant_pessoas"]
				this.bairro_q = query["bairro"]
				this.rua_q = query["rua"]
				this.definePacote()
			}
		);
		// this.pacoteCasual.items.push.apply(this.pacoteCasual.items, this.pacoteExpresso.items);
		// this.pacoteFesta.items.push.apply(this.pacoteFesta.items, this.pacoteCasual.items);
		
		//console.log(this.event)
		for(let i = 0; i < this.pacotes.length; i++)
			{
				this.selectedPacks.push({"name": this.pacotes[i].name,
										"items": [] });
			}


		// console.dir(this.newEvent);
	}
	definePacote() {
		this.pacoteExpresso = {"name": "Expresso",
								"img": "expresso.jpg",
								"desc": "Pausa para um lanche após uma reunião",
								"items": [
									{"nome": "Coxinha"				,	"type": "salgado",	"qtd": this.qtd_pessoas, "precoUnitario": 0.2},
									{"nome": "Empada"				,	"type": "salgado",	"qtd": this.qtd_pessoas*5, "precoUnitario": 0.15},
									{"nome": "Salgado de queijo"	,	"type": "salgado",	"qtd": this.qtd_pessoas*5, "precoUnitario": 0.15}
									//{"nome": "Descartáveis"				, "check": false},
									//{"nome": "Mesas e cadeiras"			, "check": false}
								]};
					
		this.pacoteCasual = {"name": "Casual",
								"img": "cerveja_artesanal.png",
								"desc": "Um bom momento para trocar uma ideia",
								"items": [
									{"nome": "Brigadeiro"			,	"type": "doce",	"qtd": this.qtd_pessoas*3, "precoUnitario": 0.3},
									{"nome": "Surpresa de uva"		,	"type": "doce",	"qtd": this.qtd_pessoas*3, "precoUnitario": 0.3},
									{"nome": "Refrigerante"			,	"type": "liquido",	"qtd": this.qtd_pessoas*0.5, "precoUnitario": 5.5},
									{"nome": "Pão de queijo"		,	"type": "salgado",	"qtd": this.qtd_pessoas*5, "precoUnitario": 0.2}
									//"Outras bebidas"	];
								]};

		this.pacoteFesta = {"name": "Festa",
								"img": "brigadeiro.jpg",
								"desc": "Descontraia com os aniversáriantes do mês",
								"items": [
									{"nome": "Torta"				,	"type": "doce",	"qtd": 1, "precoUnitario": 40}
								]};


		this.pacoteCasual.items.push.apply(this.pacoteCasual.items, this.pacoteExpresso.items);
		this.pacoteFesta.items.push.apply(this.pacoteFesta.items, this.pacoteCasual.items);

		this.pacotes = [this.pacoteExpresso, this.pacoteCasual, this.pacoteFesta]
	}

		// updatePackageItems() {
	// 	for (let i = 0; i < this.pacotes.length; i++)
	// 	{
	// 		let items = this.pacotes[i].items;

	// 		for (let j = 0; j < items.length; j++)
	// 		{
	// 			if(items[j].type !== 'torta')
	// 			items[j].qtd *= this.qtd_pessoas;
	// 		}
	// 	}
	// }

	ngAfterViewInit(): void {
		$('.chip').css('cursor', 'pointer');
	}


	selectPackage(pkg){
		console.log(pkg)
		this.selectedPack = pkg;
		this.orcamento = this.calcBudget()
	}

	checkRequiredData(): string {
		let flag = (this.selectedPack.items !== undefined);

		let str = "btn disabled";

		if (flag) {
			str = "btn";
		}

		return str;
	}

	confirmDetails(): void {
		this.router.navigate(['/organizer', 'event', 'confirmation'], {
			queryParams: {
				"data": this.data,
				"quant_pessoas": this.qtd_pessoas,
				"bairro": this.bairro_q,
				"rua": this.rua_q,
				"pacote": JSON.stringify(this.selectedPack),
				"orcamento": this.orcamento
			}
		});
	}

	calcBudget(){
		let budget = 0;
		if(this.selectedPack.items !== undefined)
		{
			for(let i = 0; i < this.selectedPack.items.length; i++){
				budget += this.selectedPack.items[i].qtd * this.selectedPack.items[i].precoUnitario;
			}
		}
		// this.orcamento = budget
		
		console.log("this.orcamento")
		return budget;
	}

/*
	// Não utilizado
	goBack(): void {
		this.location.back();
	}
*/
}
