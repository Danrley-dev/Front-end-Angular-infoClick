import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from '../shared/material.module';
import { TermoDePrivacidadeComponent } from './components/termo-de-privacidade/termo-de-privacidade.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    TermoDePrivacidadeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
