import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardenhostelsComponent } from './wardenhostels.component';

describe('WardenhostelsComponent', () => {
  let component: WardenhostelsComponent;
  let fixture: ComponentFixture<WardenhostelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardenhostelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardenhostelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
