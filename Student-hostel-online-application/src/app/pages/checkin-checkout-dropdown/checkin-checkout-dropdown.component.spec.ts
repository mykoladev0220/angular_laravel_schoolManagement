import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinCheckoutDropdownComponent } from './checkin-checkout-dropdown.component';

describe('CheckinCheckoutDropdownComponent', () => {
  let component: CheckinCheckoutDropdownComponent;
  let fixture: ComponentFixture<CheckinCheckoutDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinCheckoutDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinCheckoutDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
