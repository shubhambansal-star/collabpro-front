import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MorrisJsModule } from 'angular-morris-js';
import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, EmployeeDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    NgApexchartsModule,
    TooltipModule.forRoot()
  ]
})
export class DashboardModule { }
