import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./timeline.css', './homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
    // $.getScript('assets/modernizr.js');
  }

  ngAfterViewInit() {
    // $.getScript("assets/main.js");
  }

}
