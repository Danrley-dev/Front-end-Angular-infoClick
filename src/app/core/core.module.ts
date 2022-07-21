import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from '../shared/material.module';
import { TermoDePrivacidadeComponent } from './components/termo-de-privacidade/termo-de-privacidade.component';
import { DialogHomeComponent } from './components/dialog-home/dialog-home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    TermoDePrivacidadeComponent,
    DialogHomeComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbCollapseModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
