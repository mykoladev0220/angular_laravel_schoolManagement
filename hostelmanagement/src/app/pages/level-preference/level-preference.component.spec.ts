import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelPreferenceComponent } from './level-preference.component';

describe('LevelPreferenceComponent', () => {
  let component: LevelPreferenceComponent;
  let fixture: ComponentFixture<LevelPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelPreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
