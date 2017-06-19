import { Component } 			from '@angular/core';
import { Location }				from '@angular/common';
import { Router }				from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent {

	constructor(private location: Location,
				private router	: Router	) { }

	goDashboard() {
		let path = ['/organizer'];
		this.router.navigate(path);
	}
}