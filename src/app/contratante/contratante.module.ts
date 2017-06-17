import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratanteComponent } from './contratante.component';
import { ContratanteService } from './contratante.service';
import { HomeComponent } from './home/home.component';
import { ContratanteRoutingModule } from './contratante.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContratanteRoutingModule,
  ],
  declarations: [ContratanteComponent, HomeComponent],
  providers: [ContratanteService],
  exports: [ContratanteComponent]
})
export class ContratanteModule { }
