import { Component, OnInit } from '@angular/core';

declare let $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../homepage/timeline.css']
})
export class HomeComponent implements OnInit {

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
