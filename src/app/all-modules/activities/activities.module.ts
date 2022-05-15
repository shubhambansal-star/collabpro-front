import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesMainComponent } from './activities-main/activities-main.component';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [ActivitiesComponent, ActivitiesMainComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    TooltipModule.forRoot()
  ]
})

export class ActivitiesModule { }
