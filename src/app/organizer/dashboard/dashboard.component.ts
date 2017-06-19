import { Component, OnInit } from '@angular/core';

declare let $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../homepage/timeline.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.tap-target').tapTarget('open');
  }

  open() {
    $('.tap-target').tapTarget('open');
  }
  ngAfterViewInit() {
    $.getScript('assets/modernizr.js');
    $.getScript("assets/main.js");
  }

}
