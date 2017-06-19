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
		this.selectedPackages = JSON.parse(localStorage.selectedPacks);
	}

}
