import { ModuleWithProviders, NgModule }	from '@angular/core';
import { Routes, RouterModule }				from '@angular/router';

import { OrganizerComponent }				from './organizer.component';
import { DashboardComponent }				from './dashboard/dashboard.component';

const ORGANIZER_ROUTES: Routes = [
    { path: 'organizer', component: OrganizerComponent, children: [
        {path: '', component: DashboardComponent },
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(ORGANIZER_ROUTES)],
    exports: [RouterModule]
})
export class OrganizerRoutingModule { }