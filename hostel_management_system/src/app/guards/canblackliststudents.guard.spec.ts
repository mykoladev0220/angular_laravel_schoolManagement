import { TestBed } from '@angular/core/testing';

import { CanblackliststudentsGuard } from './canblackliststudents.guard';

describe('CanblackliststudentsGuard', () => {
  let guard: CanblackliststudentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanblackliststudentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
