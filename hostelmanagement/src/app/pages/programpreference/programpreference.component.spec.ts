import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrampreferenceComponent } from './programpreference.component';

describe('ProgrampreferenceComponent', () => {
  let component: ProgrampreferenceComponent;
  let fixture: ComponentFixture<ProgrampreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrampreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrampreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
