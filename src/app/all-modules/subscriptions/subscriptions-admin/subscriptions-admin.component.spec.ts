import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsAdminComponent } from './subscriptions-admin.component';

describe('SubscriptionsAdminComponent', () => {
  let component: SubscriptionsAdminComponent;
  let fixture: ComponentFixture<SubscriptionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
