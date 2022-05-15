import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsCompanyComponent } from './subscriptions-company.component';

describe('SubscriptionsCompanyComponent', () => {
  let component: SubscriptionsCompanyComponent;
  let fixture: ComponentFixture<SubscriptionsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
