import { TestBed } from '@angular/core/testing';

import { EncriptionserviceService } from './encriptionservice.service';

describe('EncriptionserviceService', () => {
  let service: EncriptionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
