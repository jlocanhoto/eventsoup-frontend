import { Component } 			from '@angular/core';
import { Location }				from '@angular/common';
import { Router }				from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {

	constructor(private location: Location,
				private router	: Router	) { }

	finish() {
		if (localStorage.newEvent !== undefined) {
			let event = JSON.parse(localStorage.newEvent)

			//event.packageID = this.selectedPack.toString();
			//localStorage.setItem('newEvent', JSON.stringify(event));

			//let path = ['/home'];
			let path = ['/organizer', 'event', event.id, 'finish'];
			//let path = ['/home', {outlets: {spa: ['event', event.id, 'confirmation']}}];
			this.router.navigate(path);
			//let path = ['/event', this.event.id, 'purchase'];
			//this.router.navigate(path);
		}
	}

}
