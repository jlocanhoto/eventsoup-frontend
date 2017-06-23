import { Component, OnInit } from '@angular/core';

import { EventService } from './../../event/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cpf_cnpj = "12345678998"
  senha = "senha"

  constructor(private service: EventService) { }

  ngOnInit() {
    if (this.service.getToken() != null) {
      // Redirecionar para login
      console.log("Redirecionar para login");
    }
  }

  login() {
    this.service.setToken(this.cpf_cnpj, this.senha).subscribe(
      res => {
        console.log("teste")
        console.log(res);
        console.log("teste")
      },
      erro => {
        console.log("erro")
        console.log(erro)
        console.log("erro")
      });
  }

  getToken() {
    console.log(this.service.getToken());
  }

}
