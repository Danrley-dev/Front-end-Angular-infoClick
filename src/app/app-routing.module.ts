import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { TermoDePrivacidadeComponent } from './core/components/termo-de-privacidade/termo-de-privacidade.component';
import { HomeComponent } from './home/home.component';
import { ProdutoDetailComponent } from './produtos/components/produto-detail/produto-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'termo-de-privacidade', component: TermoDePrivacidadeComponent},
  {path: 'produto-detail', component:ProdutoDetailComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
