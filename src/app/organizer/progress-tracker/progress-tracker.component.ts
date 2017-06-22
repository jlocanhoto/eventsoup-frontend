import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {

  constructor() { }

  actual :				string = "";
  classComplete : 		string = "done";
  classNotComplete :	string = "todo";

  getClass(){

  }


  ngOnInit() {
  }

}
