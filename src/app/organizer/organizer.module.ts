import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { RouterModule }     from '@angular/router'

import { CreateEventComponent }		from './create-event/create-event.component';
import { SelectPackageComponent } from './select-package/select-package.component';
import { ConfirmDetailsComponent } from './confirm-details/confirm-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
  	CreateEventComponent,
    SelectPackageComponent,
    ConfirmDetailsComponent
  ],
  declarations: [
  	CreateEventComponent,
  	SelectPackageComponent,
  	ConfirmDetailsComponent
  ],
  providers: [
  ]
})
export class OrganizerModule { }
