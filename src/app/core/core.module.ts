import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
