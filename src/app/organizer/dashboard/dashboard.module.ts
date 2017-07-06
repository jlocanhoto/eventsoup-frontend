import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CardOrganizerComponent} from './card/card-organizer.component';
import {DashboardComponent} from './dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [DashboardComponent, CardOrganizerComponent  ],

})
export class DashboardModule { }
