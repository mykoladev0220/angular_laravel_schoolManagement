import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelsDropdownOptionsComponent } from './hostels-dropdown-options.component';

describe('HostelsDropdownOptionsComponent', () => {
  let component: HostelsDropdownOptionsComponent;
  let fixture: ComponentFixture<HostelsDropdownOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelsDropdownOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelsDropdownOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
