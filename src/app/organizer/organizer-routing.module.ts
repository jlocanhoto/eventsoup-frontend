import { ModuleWithProviders, NgModule }	from '@angular/core';
import { Routes, RouterModule }				from '@angular/router';

import { OrganizerComponent }				from './organizer.component';
import { DashboardComponent }				from './dashboard/dashboard.component';
import { CreateEventComponent }		  		from './create-event/create-event.component';
import { SelectPackageComponent }   		from './select-package/select-package.component';
import { ConfirmDetailsComponent }  		from './confirm-details/confirm-details.component';
import { PurchaseComponent } 				from './purchase/purchase.component';
import { FinishComponent }          		from './finish/finish.component';
import { LoginComponent } from './../core/login/login.component';

const ORGANIZER_ROUTES: Routes = [
    { path: 'organizer', component: OrganizerComponent, children: [
        {path: '', component: DashboardComponent },
        {path: 'event/create', component: CreateEventComponent},
  		{path: 'event/:id/packages', component: SelectPackageComponent},
  		{path: 'event/:id/confirmation', component: ConfirmDetailsComponent},
  		{path: 'event/:id/purchase', component: PurchaseComponent},
  		{path: 'event/:id/finish', component: FinishComponent}
    ] },
    { path: 'login', component: LoginComponent },
]

@NgModule({
    imports: [RouterModule.forChild(ORGANIZER_ROUTES)],
    exports: [RouterModule]
})
export class OrganizerRoutingModule { }