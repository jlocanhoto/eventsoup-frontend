import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor.component';

const FORNECEDOR_ROUTES: Routes = [
    { path: 'fornecedor', component: FornecedorComponent }
]

@NgModule({
    imports: [RouterModule.forChild(FORNECEDOR_ROUTES)],
    exports: [RouterModule]
})
export class FornecedorRoutingModule {}