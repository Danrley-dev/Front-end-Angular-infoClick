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
import { LojaEmpreendedorComponent } from './empreendedor/loja-empreendedor/loja-empreendedor.component';
import { interceptors } from './core/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { LojaEditComponent } from './empreendedor/loja-edit/loja-edit/loja-edit.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrinhoComponent,
    LojaCreateComponent,
    LojaEmpreendedorComponent,
    LojaEditComponent
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
    AuthModule,
    ProdutosModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage())
  ],
  providers: [interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
