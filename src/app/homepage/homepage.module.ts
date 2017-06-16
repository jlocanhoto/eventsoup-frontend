import { HomepageComponent } from './homepage.component';
import { HomepageService } from './homepage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [HomepageService],
  declarations: [HomepageComponent],
  exports: [HomepageComponent]
})
export class HomepageModule { }
