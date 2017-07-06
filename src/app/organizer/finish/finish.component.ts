import { Component } 			from '@angular/core';
import { Location }				from '@angular/common';
import { Router, ActivatedRoute }				from '@angular/router';



@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent {


	data:Date;
	qtd_pessoas: number;
	endereco: string;
	pacote:any;
	orcamento: number;
	nome: string;
	descricao: string;

	constructor(private location: Location,
							private route: ActivatedRoute,
							private router	: Router,) { }

	goDashboard() {
		let path = ['/organizer'];
		this.router.navigate(path);
	}
}