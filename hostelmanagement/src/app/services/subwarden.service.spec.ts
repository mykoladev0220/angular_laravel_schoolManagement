import { TestBed } from '@angular/core/testing';

import { SubwardenService } from './subwarden.service';

describe('SubwardenService', () => {
  let service: SubwardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubwardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
