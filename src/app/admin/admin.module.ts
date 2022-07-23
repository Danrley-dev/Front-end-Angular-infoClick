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





@NgModule({
  declarations: [
    AdminComponent,
    EditsComponent,
    EditConsumidorComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    NgbCollapseModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ]
})
export class AdminModule { }
