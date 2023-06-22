import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResertComponent } from './password-resert.component';

describe('PasswordResertComponent', () => {
  let component: PasswordResertComponent;
  let fixture: ComponentFixture<PasswordResertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
