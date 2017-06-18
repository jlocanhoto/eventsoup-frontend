import { NgModule } 				from '@angular/core';
import { CommonModule } 		from '@angular/common';
import { RouterModule }     from '@angular/router'

import { CreateEventComponent }		from './create-event/create-event.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
  	CreateEventComponent
  ],
  declarations: [
  	CreateEventComponent
  ],
  providers: [
  ]
})
export class OrganizerModule { }
