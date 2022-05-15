import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionsAdminComponent } from './subscriptions-admin/subscriptions-admin.component';
import { SubscriptionsCompanyComponent } from './subscriptions-company/subscriptions-company.component';
import { SubscribedCompaniesComponent } from './subscribed-companies/subscribed-companies.component';


@NgModule({
  declarations: [SubscriptionsComponent, SubscriptionsAdminComponent, SubscriptionsCompanyComponent, SubscribedCompaniesComponent],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
