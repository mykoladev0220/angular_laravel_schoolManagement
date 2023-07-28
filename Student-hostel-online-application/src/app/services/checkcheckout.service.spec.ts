import { TestBed } from '@angular/core/testing';

import { CheckcheckoutService } from './checkcheckout.service';

describe('CheckcheckoutService', () => {
  let service: CheckcheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckcheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
