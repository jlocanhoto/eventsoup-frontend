import { Component, OnInit } from '@angular/core';

import { OrganizerService } from './../organizer.service';

declare let $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../homepage/timeline.css']
})
export class DashboardComponent implements OnInit {

  eventos: any;

  constructor(private service: OrganizerService) { }

  ngOnInit() {
    // $('.tap-target').tapTarget('open');
    this.service.getEventos(localStorage.getItem("token")).subscribe(
    res => {
      this.eventos = res
      // console.log(this.eventos);
      $.getScript('assets/modernizr.js');
      $.getScript("assets/main.js");
    });
  }

}
