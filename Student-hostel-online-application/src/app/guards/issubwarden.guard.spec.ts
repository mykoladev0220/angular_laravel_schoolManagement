import { TestBed } from '@angular/core/testing';

import { IssubwardenGuard } from './issubwarden.guard';

describe('IssubwardenGuard', () => {
  let guard: IssubwardenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IssubwardenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
