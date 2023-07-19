import { TestBed } from '@angular/core/testing';

import { CancheckincheckoutGuard } from './cancheckincheckout.guard';

describe('CancheckincheckoutGuard', () => {
  let guard: CancheckincheckoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CancheckincheckoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
