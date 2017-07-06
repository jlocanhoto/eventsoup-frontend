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
	endereco		:	any;
	pacote			:	any;
	nome			:	any;
	descricao		:	any;
	orcamento		:	number;

	constructor(private location: Location,
				private route: ActivatedRoute,
				private router: Router,
				private service: OrganizerService) { }

	
	ngOnInit() {
		this.route.queryParams.subscribe(
			query => {
				this.data = new Date(query["data"])
				this.qtd_pessoas = query["quant_pessoas"]
				this.endereco = query["endereco"]
				this.pacote = query["pacote"]
				this.orcamento = query["orcamento"]
				this.nome = query["nome"]
				this.descricao = query["descricao"]
			}
		);
	}

	finish() {
		let data = this.data.getFullYear() + '-' + this.data.getMonth() + '-' + 
					this.data.getDate() + 'T' + this.data.getHours() + ':' + this.data.getMinutes();
		this.service.criarEvento(localStorage.getItem('token'),{
				"nome": this.nome,
				"quantidade_pessoas": this.qtd_pessoas,
				"data": data,
				"orcamento": this.orcamento,
				"descricao": this.descricao,
				"endereco": JSON.parse(this.endereco),
				"pacotes": JSON.parse(this.pacote),
		}).subscribe(
			res => {
				console.log(res);
				this.router.navigate(['/organizer', 'event', 'finish']);
		},
		err => {
			console.log(err)
		});

		// for (let i; i<this.pacote.items;i++){
		// 	let item = this.pacote.items[i];

		// }
	}

}
