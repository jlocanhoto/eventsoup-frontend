import { HomePageRoutingModule } from './homepage/homepage.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { HomepageModule } from './homepage/homepage.module';
import { ContratanteModule } from './contratante/contratante.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FornecedorModule,
    HomepageModule,
    ContratanteModule,
    HomePageRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
