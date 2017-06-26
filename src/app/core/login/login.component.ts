import { Component }       from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { EventService }            from './../../event/event.service';
import { User }                    from '../user';

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ngAfterViewInit() {
    var newRule = ` input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        -webkit-text-fill-color: white;
                    }`;
    $("style").append(newRule);
    //$("<style>body { background: black; }</style>").appendTo( "head" )
  }
}
