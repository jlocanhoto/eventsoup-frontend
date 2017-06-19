import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratanteComponent } from './contratante.component';
import { HomeComponent } from './home/home.component';

const CONTRATANTE_ROUTES: Routes = [
    { path: 'contratante', component: ContratanteComponent, children: [
        {path: '', component: HomeComponent },
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(CONTRATANTE_ROUTES)],
    exports: [RouterModule]
})
export class ContratanteRoutingModule {}