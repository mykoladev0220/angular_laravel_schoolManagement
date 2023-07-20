import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDropdownOptionsComponent } from './period-dropdown-options.component';

describe('PeriodDropdownOptionsComponent', () => {
  let component: PeriodDropdownOptionsComponent;
  let fixture: ComponentFixture<PeriodDropdownOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodDropdownOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodDropdownOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
