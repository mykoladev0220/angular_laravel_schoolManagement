import { TestBed } from '@angular/core/testing';

import { RoomapplicationService } from './roomapplication.service';

describe('RoomapplicationService', () => {
  let service: RoomapplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomapplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
