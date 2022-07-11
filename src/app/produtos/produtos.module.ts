import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoDetailComponent } from './components/produto-detail/produto-detail.component';
import { MaterialModule } from '../shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProdutoDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule
  ],
  exports: [
    ProdutoDetailComponent
  ]
})
export class ProdutosModule { }
