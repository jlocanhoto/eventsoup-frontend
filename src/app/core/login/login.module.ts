import { NgModule } 				        from '@angular/core';
import { CommonModule } 		        from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { LoginComponent }           from './login.component';
import { LoginFormsComponent }      from './login-forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginFormsComponent
  ],
  declarations: [
    LoginComponent,
    LoginFormsComponent
  ],
  providers: [
  ]
})
export class LoginModule { }
