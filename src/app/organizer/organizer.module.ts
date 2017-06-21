import { NgModule } 				        from '@angular/core';
import { CommonModule } 		        from '@angular/common';
import { FormsModule }              from '@angular/forms';
//import { RouterModule }             from '@angular/router';

import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { CreateEventComponent }		  from './create-event/create-event.component';
import { SelectPackageComponent }   from './select-package/select-package.component';
import { ConfirmDetailsComponent }  from './confirm-details/confirm-details.component';
import { OrganizerComponent }       from './organizer.component';
import { DashboardComponent }       from './dashboard/dashboard.component';
import { OrganizerRoutingModule }   from './organizer-routing.module';
import { PurchaseComponent }        from './purchase/purchase.component';
import { FinishComponent }          from './finish/finish.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //RouterModule,
    OrganizerRoutingModule
  ],
  exports: [
  ],
  declarations: [
  	CreateEventComponent,
  	SelectPackageComponent,
  	ConfirmDetailsComponent,
  	OrganizerComponent,
    ProgressTrackerComponent
  	DashboardComponent,
  	PurchaseComponent,
  	FinishComponent
  ],
  providers: [
  ]
})
export class OrganizerModule { }
