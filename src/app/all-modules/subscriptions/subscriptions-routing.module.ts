import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribedCompaniesComponent } from './subscribed-companies/subscribed-companies.component';
import { SubscriptionsAdminComponent } from './subscriptions-admin/subscriptions-admin.component';
import { SubscriptionsCompanyComponent } from './subscriptions-company/subscriptions-company.component';
import { SubscriptionsComponent } from './subscriptions.component';

const routes: Routes = [{ path: '', component: SubscriptionsComponent,
  children: [
    {
      path: "subscriptions-admin",
      component: SubscriptionsAdminComponent
    },
    {
      path: "subscriptions-company",
      component: SubscriptionsCompanyComponent
    },
    {
      path: "subscribed-companies",
      component: SubscribedCompaniesComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
