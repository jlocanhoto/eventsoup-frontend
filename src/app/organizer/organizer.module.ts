import { NgModule } 				        from '@angular/core';
import { CommonModule } 		        from '@angular/common';
//import { RouterModule }             from '@angular/router';

//import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';

import { CreateEventComponent }		  from './create-event/create-event.component';
import { SelectPackageComponent }   from './select-package/select-package.component';
import { ConfirmDetailsComponent }  from './confirm-details/confirm-details.component';
import { OrganizerComponent }       from './organizer.component';
import { DashboardComponent }       from './dashboard/dashboard.component';
import { OrganizerRoutingModule }   from './organizer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    //RouterModule,
    OrganizerRoutingModule
  ],
  exports: [
  	CreateEventComponent,
    SelectPackageComponent,
    ConfirmDetailsComponent
  ],
  declarations: [
  	CreateEventComponent,
  	SelectPackageComponent,
  	ConfirmDetailsComponent,
  	OrganizerComponent,
  	DashboardComponent
  ],
  providers: [
  ]
})
export class OrganizerModule { }
