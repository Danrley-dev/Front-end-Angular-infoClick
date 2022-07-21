import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoDetailComponent } from './components/produto-detail/produto-detail.component';
import { MaterialModule } from '../shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosListComponent } from './components/produtos-list/produtos-list.component';
import { RouterModule } from '@angular/router';
import { ProdutoCreateComponent } from './components/produto-create/produto-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProdutoDetailComponent,
    ProdutosListComponent,
    ProdutoCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  exports: [
    ProdutoDetailComponent,
    ProdutoCreateComponent,
  ]
})
export class ProdutosModule { }
