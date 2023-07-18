import { TestBed } from '@angular/core/testing';

import { ChekckCheckoutService } from './chekck-checkout.service';

describe('ChekckCheckoutService', () => {
  let service: ChekckCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekckCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
