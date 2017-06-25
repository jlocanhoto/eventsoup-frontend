import { Component, OnInit } 	from '@angular/core';
import { Location }				from '@angular/common';
import { ActivatedRoute, Router }				from '@angular/router';

declare var $ : any;

@Component({
  selector: 'confirm-details',
  templateUrl: './confirm-details.component.html',
  styleUrls: ['./confirm-details.component.css']
})
export class ConfirmDetailsComponent implements OnInit {
	tipos : any[] = [
       {id: 1, name: "Pessoa Física"},
       {id: 2, name: "Pessoa Jurídica"}
     ];

	tipoSelecionado : any = null;

	confirmpass		: any = "";
	complemento		: any = "";
	sobrenome		: any = "";
	telefone		: any = "";
	celular			: any = "";
	numero			: any = "";
	bairro			: any = "";
	titulo			: any = "";
	email			: any = "";
	senha			: any = "";
	info			: any = "";
	nome			: any = "";
	rua				: any = "";
	cep				: any = "";

	selectedPack	: any;
	eventInfo		: any;


	data:Date;
	qtd_pessoas: number;
	bairro_q: string;
	rua_q:string;
	pacote:any;

	constructor(private location: Location,
				private route: ActivatedRoute,
				private router	: Router	) { }

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
				this.eventInfo = {"rua": this.rua_q, "bairro": this.bairro_q, "numero": 0}
				this.selectedPack = JSON.parse(this.pacote);
				// console.log(this.data.getFullYear())
				// console.log(this.qtd_pessoas)
				// console.log(this.bairro_q)
				// console.log(this.rua_q);
				// console.log(this.pacote);
			}
		);
	}

	ngAfterViewInit() {
		$('select').material_select();
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

	purchase(): void {
		// if (localStorage.newEvent !== undefined) {
		// 	let event = JSON.parse(localStorage.newEvent)

			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			// let path = ['/organizer', 'event', event.id, 'purchase'];
			//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
		this.router.navigate(['/organizer', 'event', 'purchase'], {
			queryParams: {
				"data": this.data,
				"quant_pessoas": this.qtd_pessoas,
				"bairro": this.bairro_q,
				"rua": this.rua_q,
				"pacote": JSON.stringify(this.selectedPack),
				"nome": this.titulo,
				"descricao": this.info
			}
		});
			//let path = ['/event', this.event.id, 'purchase'];
			//this.router.navigate(path);
		// }
	}

	isPessoaFisica(): boolean {
		this.tipoSelecionado = $("select").val();

		return (this.tipoSelecionado === null) || (this.tipoSelecionado == 1);
	}

	goBack(): void {
		this.location.back();
	}

}
