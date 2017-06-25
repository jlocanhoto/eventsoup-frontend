import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { EventService }      from './../../event/event.service';
import { User }              from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user    : User = new User();
  title     : string = 'Eventsoup';
  loading    : boolean =  false;
  errorMsg  : string = '';
  returnUrl  : string = '/home';
  password1  : string = '';
  password2  : string = '';

  serverUrl  : string = 'https://eventsoup-backend.herokuapp.com/'
  registerUrl  : string = this.serverUrl + 'usuarios/crud-contratante/';

  flagReg    : boolean = false;

  constructor(private service        : EventService,
              private router         : Router) { }

  ngOnInit() {
    if (this.service.getToken() != null) {
      // Redirecionar para login
      console.log("Redirecionar para login");
    }
  }


  login() {
    this.loading = true;

    this.service.setToken(this.user.cpf_cnpj, this.user.password).subscribe(
      res => {
        console.log("response: " + res);

        let path = [this.returnUrl];
        this.router.navigate(path);
      },
      erro => {
        console.log("ERROR TO AUTHENTICATE: " + erro);
        this.loading = false;
      });
  }

  logon(user: User){

  }

  getToken() {
    console.log(this.service.getToken());
  }

  register() {
    if ((this.user.nome !== '') &&
      (this.user.email !== '') &&
      (this.user.cpf_cnpj !== '') &&
      (this.user.telefone !== '') &&
      (this.user.celular !== '') &&
      (this.password1 !== '') &&
      (this.password2 !== '') &&
      (this.password1 === this.password2)) {
      
        this.user.password = this.password1;
      
        this.service.registerUser(this.user)
          .subscribe(
          data => {
            this.login();
                  },
                  error => {
                      console.log("ERROR TO AUTHENTICATE");
                      this.loading = false;
                  });
    }
  }

  registerIntent() {
    this.flagReg = true;
  }

  haveAccount() {
    this.flagReg = false;
  }

  onSubmit() {
    console.log("enter pressed");
  }

}
