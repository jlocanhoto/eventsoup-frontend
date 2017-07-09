import { Component, OnInit } from '@angular/core';
import { Params, Router }    from '@angular/router';

import { OrganizerService }  from '../organizer/organizer.service';

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./timeline.css', './homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private organizerService: OrganizerService,
              private router          : Router) { }

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

  selectPackage(index: number): void {
    this.router.navigate(['/organizer', 'event', 'create'], {
      queryParams: {
        "pacote": index
      }
    });
  }

  goto(type: string): void {
    localStorage.setItem('usertype', type);
  }

}