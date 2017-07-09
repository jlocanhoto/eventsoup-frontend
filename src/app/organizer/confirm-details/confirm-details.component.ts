import { Component, OnInit } 		from '@angular/core';
import { Location }					from '@angular/common';
import { ActivatedRoute, Router }	from '@angular/router';

import { OrganizerService }         from '../organizer.service';

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

	selectedPack		: any;
	eventInfo			: any;

	data:Date;
	qtd_pessoas: number;
	bairro_q: string;
	rua_q:string;
	pacote:any;
	orcamento: number;

	logged 			: boolean = false;

	__complemento	: any = "CIn - UFPE";
	__sobrenome		: any = "Oliveira Canhoto";
	__telefone		: any = "3333-4444";
	__celular		: any = "99999-8888";
	__numero		: any = "1235";
	__bairro		: any = "Cidade Universitária";
	__email			: any = "ufpe@ufpe.br";
	__nome			: any = "João Lucas";
	__rua			: any = "Av. Prof. Moraes Rego";
	__cep			: any = "50670-901";

	regAddr			: boolean = false;

	deliveryTax		: number = 10;
	budget			: number;

	token:any;


	constructor(private location: Location,
				private route: ActivatedRoute,
				private router	: Router	,
				private service: OrganizerService) { 
					this.token = localStorage.getItem("token");
				}

	ngOnInit() {
		this.service.getEventos(this.token).subscribe(
			res => {
				// this.eventos = res
				// console.log(this.eventos);
				// $.getScript('assets/modernizr.js');
				// $.getScript("assets/main.js");
				this.logged = true
				$('#filled-in-box').prop('disabled', false);
				this.fulfillFormData();
		});

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
				console.log("pacote",this.pacote, "teste")
			}
		);
		// $('.timepicker').pickatime({
		// 	// default: 'now',
		// 	twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
		// 	donetext: 'OK',
		// 	autoclose: true,
		// });

		$(".fill-addr2").addClass("active");
		this.bairro		 = this.bairro_q;
		this.rua		 = this.rua_q;
	}

	ngAfterViewInit() {
		$('select').material_select();
		$('.modal').modal({
			complete: () => {
				if (localStorage.token !== undefined) {
					// localStorage.removeItem('token');
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
			aftershow: function(){}, //Function for after opening timepicker
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
		this.budget = 0;
		if(this.selectedPack.itens !== undefined)
		{
			for(let i = 0; i < this.selectedPack.itens.length; i++){
				this.budget += this.selectedPack.itens[i].quantidade_item * this.selectedPack.itens[i].precoUnitario;
			}
		}

		return this.service.currencyBRL(this.budget);
	}

	redefine(): void {
		console.log('redefinir');
	}

	toggleAddr(): void {
		this.regAddr = !this.regAddr;
		this.fulfillFormData();
		//console.log(this.regAddr);
	}

	purchase(hora): void {
		if(hora.length < 3){
			alert("Selecione o horário do evento")
			return;
		}
		if (this.titulo < 1) {
			alert("Defina um titulo para o evento")
			return;
		}
		hora = hora.split(':')
		// alert(hora[0])
		
		let data = new Date(this.data.getFullYear(),this.data.getMonth(),
					this.data.getDate(), hora[0], hora[1])
		let endereco = JSON.stringify(this.montarEndereco());
		/*this.router.navigate(['/organizer', 'event', 'purchase'], {
			queryParams: {
				"data": data,
				"quant_pessoas": this.qtd_pessoas,
				"endereco": JSON.stringify(this.montarEndereco()),
				"pacote": this.pacote,
				"nome": this.titulo,
				"descricao": this.info,
				"orcamento": this.orcamento
			}
		});*/
		let contato = "";
		if(this.celular !== "")
			contato = this.celular;

		else if(this.telefone !== "")
			contato = this.telefone;

		let jsonData = {
				"token": this.token,
				"cpf": localStorage.getItem('cpf'),
				"data": data,
				"quant_pessoas": this.qtd_pessoas,
				"endereco": endereco,
				"pacote": JSON.parse(this.pacote).nome,
				"pacote_detail": this.pacote,
				"nome": this.nome + ' ' + this.sobrenome,
				"descricao": this.info,
				"orcamento": Number(this.getTotal().replace(/,/g, '.')).toFixed(2),
				"email": this.email.split('@')[0],
				"contato": contato
			};

		console.log(jsonData)

		let code = this.service.get_redirect_code(jsonData).subscribe(
			res => {
				console.log("success purchase");
				console.log(res.checkoutCode)

				let that = this;


				let lightbox = PagSeguroLightbox({
								code: res.checkoutCode
							},
							{
								success: function(transactionCode){
									let pacote = JSON.parse(that.pacote);
									console.log(pacote);

									that.service.criarEvento(that.token,
									{
										nome: that.nome,
										quantidade_pessoas: that.qtd_pessoas,
										data: that.data,
										orcamento: that.orcamento,
										descricao: that.info,
										codigo_pag_seguro: transactionCode,
										endereco:  JSON.parse(endereco),
										pacotes: pacote
									}).subscribe(
										res => {
														console.log(res);
														that.router.navigate(['/organizer', 'event', 'finish']);
												},
										err => {
													console.log(err);
												}
								);
								
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
		
	}

	montarEndereco() {
		return {
			"rua": this.__rua,
			"bairro": this.__bairro,
			"cidade": "Recife",
			"estado": "PE",
			"cep": this.__cep,
			"numero": this.__numero
		}
	}

	isPessoaFisica(): boolean {
		this.tipoSelecionado = $("select").val();

		return (this.tipoSelecionado === null) || (this.tipoSelecionado == 1);
	}

	getDeliveryTax(): string {
		return this.service.currencyBRL(this.deliveryTax);
	}

	getEventTime(): string {
		return $("#timepicker")[0].value;
	}

	subtractTime(time1, time2): string {
		time1 = time1.split(':'); time2 = time2.split(':');

		let hr1 = +time1[0]; let min1 = +time1[1];
		let hr2 = +time2[0]; let min2 = +time2[1];

		let min = min1 - min2;
		let hour = hr1;

		if (min < 0) {
			min = 60 + min;
			hour--;
		}

		hour -= hr2;

		if (hour < 0) {
			hour = 24 + hour;
		}

		let time = ('0' + hour.toString()).slice(-2) + ":" + ('0' + min.toString()).slice(-2);

		return time;
	};

	getDeliveryTime(): string {
		let eventTime = this.getEventTime();
		let ret = '00:00';

		if (eventTime) {
			ret = this.subtractTime(eventTime, '00:30');
		}

		return ret;
	}

	getTotal(): string {
		return this.service.currencyBRL(this.budget + this.deliveryTax);
	}

	goBack(): void {
		this.location.back();
	}

}