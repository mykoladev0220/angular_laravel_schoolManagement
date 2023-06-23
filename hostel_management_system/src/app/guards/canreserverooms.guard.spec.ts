import { TestBed } from '@angular/core/testing';

import { CanreserveroomsGuard } from './canreserverooms.guard';

describe('CanreserveroomsGuard', () => {
  let guard: CanreserveroomsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanreserveroomsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
