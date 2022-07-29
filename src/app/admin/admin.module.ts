import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { EditsComponent } from './components/edits/edits/edits.component';
import { MaterialModule } from '../shared/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditConsumidorComponent } from './components/edit-consumidor/edit-consumidor/edit-consumidor.component';
import { GraficosComponent } from './components/graficos/graficos/graficos.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraficoComponent } from './components/graficos/grafico/grafico.component';
import { GraficoConsumidorComponent } from './components/graficos/graficoConsumidor/graficoConsumidor.component';
import { GraficoEmpreendedorComponent } from './components/graficos/graficoEmpreendedor/graficoEmpreendedor.component';






@NgModule({
  declarations: [
    AdminComponent,
    EditsComponent,
    EditConsumidorComponent,
    GraficosComponent,
    GraficoComponent,
    GraficoConsumidorComponent,
    GraficoEmpreendedorComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgbCollapseModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
    ]
})
export class AdminModule { }
