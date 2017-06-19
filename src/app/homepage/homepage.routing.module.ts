import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';

const HOME_PAGE_ROUTES: Routes = [
    { path: '', component: HomepageComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(HOME_PAGE_ROUTES)],
    exports: [RouterModule]
})
export class HomePageRoutingModule {}