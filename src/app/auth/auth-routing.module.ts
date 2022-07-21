import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEditComponent } from './cadastro-edit/cadastro-edit.component';

const routes: Routes = [
  {
    path:'cadastro-edit', component: CadastroEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
