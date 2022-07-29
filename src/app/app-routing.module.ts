import { GraficoComponent } from './admin/components/graficos/grafico/grafico.component';
import { GraficosComponent } from './admin/components/graficos/graficos/graficos.component';
import { RoleEmpreendedorGuard } from './auth/guards/roleEmpreendedor/role-empreendedor.guard';
import { AdminComponent } from './admin/components/admin/admin/admin.component';
import { LojaEmpreendedorComponent } from './empreendedor/loja-empreendedor/loja-empreendedor.component';
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
import { ProdutoCreateComponent } from './produtos/components/produto-create/produto-create.component';
import { AuthLogadoGuard } from './auth/guards/auth-logado/auth-logado.guard';
import { AuthGuard } from './auth/guards/auth/auth.guard';
import { RoleAdminGuard } from './auth/guards/roleAdmin/role-admin.guard';
import { CadastroEditComponent } from './auth/cadastro-edit/cadastro-edit.component';
import { EditsComponent } from './admin/components/edits/edits/edits.component';
import { EditConsumidorComponent } from './admin/components/edit-consumidor/edit-consumidor/edit-consumidor.component';
import { ProdutoUpdateComponent } from './produtos/components/produto-update/produto-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/grafico',
    component: GraficoComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'admin/graficos',
    component: GraficosComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'admin/consumidor-edit/:id',
    component: EditConsumidorComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'admin/cadastro-edit/:id',
    component: CadastroEditComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'edit',
    component: EditsComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'admin/edit/:id',
    component: EditsComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'loja-empreendedor/:id/edit/:id',
    component: ProdutoUpdateComponent,
    // canActivate: [RoleAdminGuard],
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthLogadoGuard]
  },
  {
    path: 'cadastro-edit',
    component: CadastroEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLogadoGuard]
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent
  },
  {
    path: 'termo-de-privacidade',
    component: TermoDePrivacidadeComponent
  },
  {
    path: 'produto-create',
    component: ProdutoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'produto-update/:id',
    component: ProdutoUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'produto-detail/:id',
    component: ProdutoDetailComponent
  },
  {
    path: 'categoria/:id',
    component: ProdutosListComponent,
  },
  {
    path: 'categoria',
    component: ProdutosListComponent,
  },
  {
    path: 'produtos-list',
    component: ProdutosListComponent,
  },
  {
    path: 'detalhe-usuario/:id',
    component: ProdutosListComponent,
  },
  {
    path: 'pesquisar/:keyword',
    component: ProdutosListComponent
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
  {
    path: 'loja-create',
    component: LojaCreateComponent,
    canActivate: [AuthGuard, RoleEmpreendedorGuard]
  },
  {
    path: 'loja-empreendedor/:id',
    component: LojaEmpreendedorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
