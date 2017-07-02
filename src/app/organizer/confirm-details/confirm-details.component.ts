import { Component, OnInit } 		from '@angular/core';
import { Location }					from '@angular/common';
import { ActivatedRoute, Router }	from '@angular/router';

import { EventService }				from './../../event/event.service';

declare var $ : any;
declare var PagSeguroLightbox : any;

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

	logged 			: boolean = false;

	__complemento	: any = "CIn - UFPE";
	__sobrenome		: any = "Oliveira Canhoto";
	__telefone		: any = "(81) 3333-4444";
	__celular		: any = "(81) 99999-8888";
	__numero		: any = "1235";
	__bairro		: any = "Cidade Universitária";
	__email			: any = "ufpe@ufpe.br";
	__nome			: any = "João Lucas";
	__rua			: any = "Av. Prof. Moraes Rego";
	__cep			: any = "50670-901";

	regAddr			: boolean = false;

	data			: Date;
	qtd_pessoas		: number;
	bairro_q		: string;
	rua_q			: string;
	pacote			: any;

	constructor(private location: Location,
				private route: ActivatedRoute,
				private router	: Router,
				private service : EventService) { }

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

		$(".fill-addr2").addClass("active");
		this.bairro		 = this.bairro_q;
		this.rua		 = this.rua_q;
	}

	ngAfterViewInit() {
		$('select').material_select();
		$('.modal').modal({
			complete: () => {
				if (localStorage.token !== undefined) {
					localStorage.removeItem('token');
					console.log('User logged in');
					this.logged = true;

					$('#filled-in-box').prop('disabled', false);

					this.fulfillFormData();
				}
				else {
					console.log('User closed modal');
				}

				localStorage.setItem('eraseInput', 'true');
			}
		});

		$('#filled-in-box').bind('change', () => {
			this.toggleAddr();
		});

		$('#numero').bind('change', () => {
			if (this.numero === "") {
				this.eventInfo.numero = 0;
			}
			else {
				this.eventInfo.numero = this.numero;
			}
		});

		$('#timepicker').pickatime({
			default: 'now', // Set default time
			fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			twelvehour: false, // Use AM/PM or 24-hour format
			donetext: 'OK', // text for done-button
			cleartext: 'Limpar', // text for clear-button
			canceltext: 'Cancelar', // Text for cancel-button
			autoclose: false, // automatic close timepicker
			ampmclickable: true, // make AM PM clickable
			aftershow: function(){} //Function for after opening timepicker  
		});
	}

	fulfillFormData() {
		if (this.logged) {
			$(".fill-user").addClass("active");
			this.nome		 = this.__nome;
			this.sobrenome	 = this.__sobrenome;
			this.email		 = this.__email;
			this.telefone	 = this.__telefone;
			this.celular	 = this.__celular;
		}
		else {
			$(".fill-user").removeClass("active");
			this.nome		 = "";
			this.sobrenome	 = "";
			this.email		 = "";
			this.telefone	 = "";
			this.celular	 = "";
		}

		if (this.regAddr) {
			$(".fill-addr").addClass("active");
			this.complemento = this.__complemento;			
			this.numero		 = this.__numero;
			this.bairro		 = this.__bairro;						
			this.rua		 = this.__rua;
			this.cep		 = this.__cep;
		}
		else {
			$(".fill-addr").removeClass("active");
			this.complemento = "";
			this.numero		 = "";
			this.bairro		 = this.bairro_q;
			this.rua		 = this.rua_q;
			this.cep		 = "";
		}
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

	redefine(): void {
		console.log('redefinir');
	}

	toggleAddr(): void {
		this.regAddr = !this.regAddr;
		this.fulfillFormData();
		//console.log(this.regAddr);
	}

	purchase(): void {
		// if (localStorage.newEvent !== undefined) {
		// 	let event = JSON.parse(localStorage.newEvent)

			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			// let path = ['/organizer', 'event', event.id, 'purchase'];
			//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
		let code = this.service.get_redirect_code().subscribe(
			res => {
				console.log("success purchase");
				console.log(res.checkoutCode)


				let lightbox = PagSeguroLightbox({
								code: res.checkoutCode
							},
							{
								success: function(transactionCode){
								alert("Operação de pagamento efetuada com sucesso. Aguardar confirmação do pagseguro.");
							},
								abort: function(){
								alert("Operação de pagamento não efetuada.");
							}
						});

				if(!lightbox){
					location.href = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
				}

			},

			erro => {
			console.log("ERROR TO AUTHENTICATE: " + erro);
			}
		);

/*		this.router.navigate(['/organizer', 'event', 'purchase'], {
			queryParams: {
				"data": this.data,
				"quant_pessoas": this.qtd_pessoas,
				"bairro": this.bairro_q,
				"rua": this.rua_q,
				"pacote": JSON.stringify(this.selectedPack),
				"nome": this.titulo,
				"descricao": this.info,
				"orcamento": this.calcBudget()
			}
		});*/

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
