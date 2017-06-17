import { Component, OnInit } from '@angular/core';

declare let $;

@Component({
  selector: 'app-contratante',
  templateUrl: './contratante.component.html',
  styleUrls: ['./contratante.component.css']
})
export class ContratanteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".button-collapse").sideNav();
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
    // left: 0px; touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    // touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 50%; right: 0px;
  }

}
