import { Component } 						from '@angular/core';
import { Location }							from '@angular/common';
import { ActivatedRoute, Router }			from '@angular/router';

import { OrganizerService }					from './../organizer.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {

	data			:	Date;
	qtd_pessoas		:	number;
	bairro_q		:	string;
	rua_q			:	string;
	pacote			:	any;
	nome			:	any;
	descricao		:	any;
	orcamento		:	number;

	constructor(private location: Location,
				private route: ActivatedRoute,
				private router: Router,
				private service: OrganizerService) { }

	ngOnInit() {
		// this.selectedPackages = JSON.parse(localStorage.selectedPacks);
		// this.eventInfo = JSON.parse(localStorage.newEvent);

		// pega os dados informados na página anterior
		this.route.queryParams.subscribe(
			query => {
				this.data = new Date(query["data"])
				this.qtd_pessoas = query["quant_pessoas"]
				this.bairro_q = query["bairro"]
				this.rua_q = query["rua"]
				this.pacote = query["pacote"]
				this.nome = query["nome"]
				this.descricao = query["descricao"]
				this.orcamento = query["orcamento"]
				// console.log(this.data.getFullYear())
				// console.log(this.qtd_pessoas)
				// console.log(this.bairro_q)
				// console.log(this.rua_q);
				// console.log(this.pacote);
				// console.log(this.nome);
				// console.log(this.descricao);
			}
		);
	}

	finish() {
		// if (localStorage.newEvent !== undefined) {
		// 	let event = JSON.parse(localStorage.newEvent)

			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			// let path = ['/organizer', 'event', event.id, 'finish'];
			//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
		this.service.criarEvento(localStorage.getItem("token"), {
			"nome": this.nome,
			"quantidade_pessoas": this.qtd_pessoas,
			"data": this.data.getFullYear() + "-" + this.data.getMonth() + "-" + this.data.getDay() + "T" + this.data.getHours() + ":" + this.data.getMinutes(),
			"orcamento": this.orcamento
		}).subscribe(
			res => {
				console.log("success purchase")
				console.log(res)
			},
			erro => {
				console.log("erro purchase")
				console.log(erro)
				console.log("erro purchase")
			}
		);
		this.router.navigate(['/organizer', 'event', 'finish']);
			//let path = ['/event', this.event.id, 'purchase'];
			//this.router.navigate(path);
		// }
	}

}
