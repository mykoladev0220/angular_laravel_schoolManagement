import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutReportComponent } from './checkout-report.component';

describe('CheckoutReportComponent', () => {
  let component: CheckoutReportComponent;
  let fixture: ComponentFixture<CheckoutReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
