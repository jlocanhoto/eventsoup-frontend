import { Component, OnInit } 	from '@angular/core';
import { Location }				from '@angular/common';
import { Router }				from '@angular/router';

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
	numero			: any = "";
	bairro			: any = "";
	titulo			: any = "";
	email			: any = "";
	senha			: any = "";
	info			: any = "";
	nome			: any = "";
	rua				: any = "";
	cep				: any = "";

	selectedPack		: any = JSON.parse(localStorage.selectedPack);
	eventInfo			: any = JSON.parse(localStorage.newEvent);

	constructor(private location: Location,
				private router	: Router	) { }

	ngOnInit() {
		this.selectedPackages = JSON.parse(localStorage.selectedPacks);
		this.eventInfo = JSON.parse(localStorage.newEvent);
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
		if (localStorage.newEvent !== undefined) {
			let event = JSON.parse(localStorage.newEvent)

			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			let path = ['/organizer', 'event', event.id, 'purchase'];
			//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
			this.router.navigate(path);
			//let path = ['/event', this.event.id, 'purchase'];
			//this.router.navigate(path);
		}
	}

	isPessoaFisica(): boolean {
		this.tipoSelecionado = $("select").val();

		return (this.tipoSelecionado === null) || (this.tipoSelecionado == 1);
	}

	goBack(): void {
		this.location.back();
	}

}
