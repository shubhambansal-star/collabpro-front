import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectreportsRoutingModule } from './projectreports-routing.module';
import { ProjectreportsComponent } from './projectreports.component';
import { ProjectreportsListComponent } from './projectreports-list/projectreports-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [ProjectreportsComponent, ProjectreportsListComponent],
  imports: [
    CommonModule,
    ProjectreportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot()
  ]
})
export class ProjectreportsModule { }
