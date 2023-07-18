import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubwardenComponent } from './create-subwarden.component';

describe('CreateSubwardenComponent', () => {
  let component: CreateSubwardenComponent;
  let fixture: ComponentFixture<CreateSubwardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubwardenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubwardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
