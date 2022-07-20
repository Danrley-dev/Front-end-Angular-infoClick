import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxMaskModule } from 'ngx-mask';
import { LoaderComponent } from '../shared/loader/loader.component';
import { CadastroEditComponent } from './cadastro-edit/cadastro-edit.component';


@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    LoaderComponent,
    CadastroEditComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxMaskModule.forRoot()
  ]
})
export class AuthModule { }
