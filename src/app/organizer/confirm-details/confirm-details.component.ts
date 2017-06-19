import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'confirm-details',
  templateUrl: './confirm-details.component.html',
  styleUrls: ['./confirm-details.component.css']
})
export class ConfirmDetailsComponent implements OnInit {
	selectedPackages = [];
	packageNames = [];

	constructor() { }

	ngOnInit() {
		this.selectedPackages = [{"name":"pacote1", "items":['cu', 'buceta']}, {"name":"pacote2", "items":['rola']}];
	}

}
