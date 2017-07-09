import { Component, Input, OnInit }			from '@angular/core';
import { ActivatedRoute, Params, Router }	from '@angular/router';
import { Location }							from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Event } 							from '../../event/event';
import { EventService }						from '../../event/event.service';

import { OrganizerService }        			from '../organizer.service';

declare var $ : any;

@Component({
	selector: 'select-package',
	templateUrl: './select-package.component.html',
	styleUrls: ['./select-package.component.css']
})
export class SelectPackageComponent implements OnInit {
	@Input() event	: Event;	//recebe evento do pai, create-event

	peopleQty		: number[] 	= [1, 0, 0, 0, 0, 0];
	timeEating		: number 	= 0;
	newEvent		: any;

	selectedPack	: any = {};
	qtySelPacks		: number = 0;

	data			: Date;
	qtd_pessoas		: number;
	bairro_q		: string;
	rua_q			: string;
	pacote_q		: number;
	orcamento		: number;

	pacotes			: any;

	constructor (private eventService		: EventService    ,
				 private route				: ActivatedRoute  ,
				 private location			: Location        ,
				 private router				: Router          ,
				 private organizerService	: OrganizerService) { }

	ngOnInit(): void {
		// pega os dados informados na página anterior
		this.route.queryParams.subscribe(
			query => {
				this.data = new Date(query["data"]);
				this.qtd_pessoas = query["quant_pessoas"];
				this.bairro_q = query["bairro"];
				this.rua_q = query["rua"];
				
				this.pacotes = this.organizerService.definePackages(this.qtd_pessoas);

				this.pacote_q = query["pacote"];

				if (this.pacote_q) {
					this.selectedPack = this.organizerService.getSelectedPackage(this.pacote_q);
					this.orcamento = this.calcBudget();

					console.log(this.orcamento);
					console.log(this.selectedPack);

					this.confirmDetails();
				}
			}
		);

		// console.dir(this.newEvent);
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
	/*
	ngAfterViewInit(): void {
		$('.chip').css('cursor', 'pointer');
	}
	*/

	selectPackage(pkg, index){
		console.log(pkg)
		this.pacote_q = index;
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
				"pacote": JSON.stringify(this.montarPacote()),
				"orcamento": this.orcamento
			}
		});
	}

	montarPacote() {
		let itens = [];
		let itemsofpackage = this.selectedPack.items;
		
		for (let i = 0; i < itemsofpackage.length; i++) {
			let item = {
				"id": itemsofpackage[i].id,
				"quantidade_item": itemsofpackage[i].qtd,
				"precoUnitario": itemsofpackage[i].precoUnitario,
				"nome": itemsofpackage[i].nome
			}

			itens.push(item);
		}

		return {
			"nome": this.selectedPack.name,
			"quantidade_pessoas": this.qtd_pessoas,
			"preco": this.orcamento,
			"fornecedor": 5,
			"itens": itens
		}
		// console.log(this.selectedPack)
		/*
		"nome": "nome_do_pacote",
		"quantidade_pessoas": quantidade_pessoas,
		"preco": preco,
		"fornecedor": id_fornecedor,
		"itens": [
			{
				"id": id_item_1,
				"quantidade_ite": quantidade_item_1
			},
			//...
		]
		*/
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
		
		//console.log("this.orcamento")
		return budget;
	}

	getOrcamento() {
		return this.organizerService.currencyBRL(this.orcamento);
	}

/*
	// Não utilizado
	goBack(): void {
		this.location.back();
	}
*/
}
