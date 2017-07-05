import { EventService } from './../event/event.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./timeline.css', './homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private service: EventService) { 
	
  }

  ngOnInit() {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
    $('.scrollspy').scrollSpy();
	
	$(document).on('click', '.linkArea', function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 64
		}, 500);
	});
  }

  ngAfterViewInit() {
    $.getScript('assets/modernizr.js');
    $.getScript("assets/main.js");
  }
  
  ngOnDestroy() {
    $(".drag-target").css({
      "touch-action": "pan-y", 
      "-webkit-user-drag": "none", 
      "-webkit-tap-highlight-color": "#000000",
      "left": "0px"
    });
    $("#sidenav-overlay").remove();
    $("body").removeAttr( 'style' );
  }

  goto(type: string){
    localStorage.setItem('usertype', type);
  }

}

