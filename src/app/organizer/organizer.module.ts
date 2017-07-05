import { NgModule } 				        from '@angular/core';
import { CommonModule } 		        from '@angular/common';
import { FormsModule }              from '@angular/forms';
//import { RouterModule }             from '@angular/router';

import { CreateEventComponent }		  from './create-event/create-event.component';
import { SelectPackageComponent }   from './select-package/select-package.component';
import { ConfirmDetailsComponent }  from './confirm-details/confirm-details.component';
import { OrganizerComponent }       from './organizer.component';
import { DashboardComponent }       from './dashboard/dashboard.component';
import { OrganizerRoutingModule }   from './organizer-routing.module';
import { PurchaseComponent }        from './purchase/purchase.component';
import { FinishComponent }          from './finish/finish.component';
import { OrganizerService }         from './organizer.service';
import { LoginModule }              from '../core/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //RouterModule,
    OrganizerRoutingModule,
    LoginModule
  ],
  exports: [
  ],
  declarations: [
  	CreateEventComponent,
  	SelectPackageComponent,
  	ConfirmDetailsComponent,
  	OrganizerComponent,
  	DashboardComponent,
  	PurchaseComponent,
  	FinishComponent
  ],
  providers: [
    OrganizerService
  ]
})
export class OrganizerModule { }
