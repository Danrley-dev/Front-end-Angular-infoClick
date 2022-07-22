import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { EditsComponent } from './components/edits/edits/edits.component';
import { MaterialModule } from '../shared/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AdminComponent,
    EditsComponent

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
