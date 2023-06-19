import { TestBed } from '@angular/core/testing';

import { ProgrampreferenceService } from './programpreference.service';

describe('ProgrampreferenceService', () => {
  let service: ProgrampreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrampreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
