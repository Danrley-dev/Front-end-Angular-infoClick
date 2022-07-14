import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoDetailComponent } from './components/produto-detail/produto-detail.component';
import { MaterialModule } from '../shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosListComponent } from './components/produtos-list/produtos-list.component';
import { RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ProdutoDetailComponent,
    ProdutosListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    RouterModule,


  ],
  exports: [
    ProdutoDetailComponent
  ]
})
export class ProdutosModule { }
