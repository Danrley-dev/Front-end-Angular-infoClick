import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { ProdutosModule } from './produtos/produtos.module';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { LojaCreateComponent } from './empreendedor/loja-create/loja-create/loja-create.component';
import { LojaEmpreendedorComponent } from './loja-empreendedor/loja-empreendedor.component';
import { interceptors } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrinhoComponent,
    LojaCreateComponent,
    LojaEmpreendedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot({
      position: 'bottom-center',
      duration: 4000
    }),
    CoreModule,
    HttpClientModule,
    ProdutosModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
