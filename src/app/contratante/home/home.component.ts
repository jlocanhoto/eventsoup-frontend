import { ContratanteService } from './../contratante.service';
import { Component, OnInit } from '@angular/core';

declare let $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../homepage/timeline.css']
})
export class HomeComponent implements OnInit {
  
  eventos: any;

  constructor(private service: ContratanteService) { }

  ngOnInit() {
    $('.tap-target').tapTarget('open');
    this.service.getEventos("sdfsdf").subscribe(
    res => {
      this.eventos = res
      // console.log(this.eventos);
    });
  }

  open() {
    $('.tap-target').tapTarget('open');
  }
  ngAfterViewInit() {
    $.getScript('assets/modernizr.js');
    $.getScript("assets/main.js");
  }

}
