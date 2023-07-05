import { TestBed } from '@angular/core/testing';

import { CanallocateroomsGuard } from './canallocaterooms.guard';

describe('CanallocateroomsGuard', () => {
  let guard: CanallocateroomsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanallocateroomsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
