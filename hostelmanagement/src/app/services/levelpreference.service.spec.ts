import { TestBed } from '@angular/core/testing';

import { LevelpreferenceService } from './levelpreference.service';

describe('LevelpreferenceService', () => {
  let service: LevelpreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelpreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
