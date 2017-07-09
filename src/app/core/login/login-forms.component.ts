import { Component, OnInit, Input }  from '@angular/core';
import { Router }                    from '@angular/router';

import { EventService }              from './../../event/event.service';
import { User }                      from '../user';

declare var $ : any;

@Component({
  selector: 'login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css']
})
export class LoginFormsComponent implements OnInit {
  user    : User = new User();
  title     : string = 'Eventsoup';
  loading    : boolean =  false;
  errorMsg  : string = '';
  returnUrl  : string = '/' + localStorage.usertype;
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

    setInterval(() => { this.eraseData() }, 300);
  }

  eraseInputs() {
    this.user.nome      = '';
    this.user.email     = '';
    this.user.cpf_cnpj  = '';
    this.user.telefone  = '';
    this.user.celular   = '';
    this.user.password  = '';
    this.errorMsg       = '';
    this.password1      = '';
    this.password2      = '';
  }

  eraseData() {
    if (localStorage.eraseInput === 'true') {
      localStorage.removeItem('eraseInput');
      this.eraseInputs();
    }
  }

  login() {
    this.loading = true;

    this.service.setToken(this.user.cpf_cnpj, this.user.password).subscribe(
      res => {
        console.log("response: " + res);

        if (this.router.url.includes('login')) {
          let path = [this.returnUrl];
          this.router.navigate(path);
        }
        else if (this.router.url.includes('confirmation')) {
          //console.log('confirmation');
          $('#modal_login').modal('close');
        }

        this.eraseInputs();
        this.loading = false;
      },
      erro => {
        console.log("ERROR TO AUTHENTICATE: " + erro);
        this.loading = false;

        this.eraseInputs();
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
      (this.user.password !== '') &&
      (this.password2 !== '') &&
      (this.user.password === this.password2)) {
         this.service.registerUser(this.user)
             .subscribe((data) => {
                           this.login();
                         },
                        (error) => {
                             console.log("ERROR TO AUTHENTICATE");
                             this.loading = false;

                             this.eraseInputs();
                         });
    }
  }

  registerIntent() {
    this.flagReg = true;

    document.getElementById('formulario').classList.remove('col');
    document.getElementById('formulario').classList.add('col2');
  }

  haveAccount() {
    this.flagReg = false;
    document.getElementById('formulario').classList.remove('col2');
    document.getElementById('formulario').classList.add('col');
  }

  onSubmit() {
    console.log("enter pressed");
  }

}