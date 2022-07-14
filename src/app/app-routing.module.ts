import { LojaEmpreendedorComponent } from './loja-empreendedor/loja-empreendedor.component';
import { ProdutosListComponent } from './produtos/components/produtos-list/produtos-list.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './auth/cadastro/cadastro.component';
import { LoginComponent } from './auth/login/login.component';
import { RecuperarSenhaComponent } from './auth/recuperar-senha/recuperar-senha.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { TermoDePrivacidadeComponent } from './core/components/termo-de-privacidade/termo-de-privacidade.component';
import { HomeComponent } from './home/home.component';
import { ProdutoDetailComponent } from './produtos/components/produto-detail/produto-detail.component';
import { LojaCreateComponent } from './empreendedor/loja-create/loja-create/loja-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'termo-de-privacidade', component: TermoDePrivacidadeComponent },
  { path: 'produto-detail/:id', component: ProdutoDetailComponent },
  {path: 'produtos-list', component: ProdutosListComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'loja-create', component: LojaCreateComponent},
  {path: 'loja-empreendedor/:id', component:LojaEmpreendedorComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
