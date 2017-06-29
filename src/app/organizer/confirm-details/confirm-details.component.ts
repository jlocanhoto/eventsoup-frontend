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
	selectedPackages = [];
	packageNames = [];
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

	selectedPack		: any;
	eventInfo			: any;

	data:Date;
	qtd_pessoas: number;
	bairro_q: string;
	rua_q:string;
	pacote:any;
	orcamento: number;

	constructor(private location: Location,
				private route: ActivatedRoute,
				private router	: Router	) { }

	ngOnInit() {

		// pega os dados informados na página anterior
		this.route.queryParams.subscribe(
			query => {
				this.data = new Date(query["data"])
				this.qtd_pessoas = query["quant_pessoas"]
				this.bairro_q = query["bairro"]
				this.rua_q = query["rua"]
				this.pacote = query["pacote"]
				this.orcamento = query["orcamento"];
				this.eventInfo = {"rua": this.rua_q, "bairro": this.bairro_q, "numero": 0}
				this.selectedPack = JSON.parse(this.pacote);
			}
		);
		$('.timepicker').pickatime({
			// default: 'now',
			twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
			donetext: 'OK',
			autoclose: true,
		});
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

	purchase(hora:string): void {
		if (hora.length < 5 || this.titulo.length < 1) return;
		let data = new Date(this.data.getFullYear(),this.data.getMonth(),this.data.getDate(),parseInt(hora.slice(0,2)),parseInt(hora.slice(3,5)))
		this.router.navigate(['/organizer', 'event', 'purchase'], {
			queryParams: {
				"data": data,
				"quant_pessoas": this.qtd_pessoas,
				"bairro": this.bairro_q,
				"rua": this.rua_q,
				"pacote": JSON.stringify(this.selectedPack),
				"nome": this.titulo,
				"descricao": this.info,
				"orcamento": this.orcamento
			}
		});
	}

	// isPessoaFisica(): boolean {
	// 	this.tipoSelecionado = $("select").val();

	// 	return (this.tipoSelecionado === null) || (this.tipoSelecionado == 1);
	// }

	goBack(): void {
		this.location.back();
	}

}
