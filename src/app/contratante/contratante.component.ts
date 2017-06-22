import { ContratanteService } from './contratante.service';
import { Component, OnInit } from '@angular/core';

declare let $;

@Component({
  selector: 'app-contratante',
  templateUrl: './contratante.component.html',
  styleUrls: ['./contratante.component.css']
})
export class ContratanteComponent implements OnInit {
  
  eventos: any;
  token: string;

  constructor(private service: ContratanteService) { }

  ngOnInit() {
    this.service.getToken().subscribe(
      res => {
        console.log("res token")
        console.log(res);
        this.token = res;
    })
    
    $(".button-collapse").sideNav();
  }

  ngAfterViewInit() {
    this.service.getEventos(this.token).subscribe(
      res => {
        this.eventos = res
        console.log(this.eventos);
        console.log("this.eventos");
      });
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

}
