import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FornecedorComponent } from './fornecedor.component';
import { FornecedorService } from './fornecedor.service';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [FornecedorService],
  declarations: [FornecedorComponent, CardComponent],
  exports: [FornecedorComponent]
})
export class FornecedorModule { }
