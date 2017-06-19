import { NgModule }             	  from '@angular/core';
import { RouterModule, Routes }		  from '@angular/router';

import { CreateEventComponent }     from '../organizer/create-event/create-event.component';
import { SelectPackageComponent }   from '../organizer/select-package/select-package.component';
import { ConfirmDetailsComponent }  from '../organizer/confirm-details/confirm-details.component'
/*
import { DashboardComponent }   	  from '../event-organizer/dashboard/dashboard.component';
import { EventDetailComponent } 	  from '../shared/event-detail.component';
import { PurchasePacksComponent }   from '../event-organizer/purchase-package/purchase-package.component';
import { ConfirmDetailsComponent }  from '../event-organizer/confirm-details/confirm-details.component';
import { MyEventsComponent }        from '../event-organizer/my-events/my-events.component';
import { LoginComponent }			      from '../shared/login.component';
import { SkeletonComponent }        from '../shared/skeleton.component';
*/

const routes: Routes = [
  {path: 'event/create', component: CreateEventComponent},
  {path: 'event/:id/packages', component: SelectPackageComponent},
  {path: 'event/confirm-details', component: ConfirmDetailsComponent}
  /*{ path: '', redirectTo: '/home', pathMatch: 'full' 			                              },
  { path: 'login'                , component: LoginComponent                            },
  { path: 'home'                 , component: SkeletonComponent, children: [
    { path: ''			                 , component: DashboardComponent     , outlet: 'spa'},
    { path: 'detail/:id'			       , component: EventDetailComponent 	 , outlet: 'spa'},
    { path: 'event/create'		       , component: CreateEventComponent	 , outlet: 'spa'},
    { path: 'event/:id/packages'	   , component: SelectPacksComponent 	 , outlet: 'spa'},
    { path: 'event/:id/confirmation' , component: ConfirmDetailsComponent, outlet: 'spa'},
    { path: 'event/:id/purchase'	   , component: PurchasePacksComponent , outlet: 'spa'},
    { path: 'events'			           , component: MyEventsComponent		   , outlet: 'spa'}
  ]}*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
