import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage.component';
import { HomepageService } from './homepage.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [HomepageService],
  declarations: [HomepageComponent],
  exports: [HomepageComponent]
})
export class HomepageModule { }
