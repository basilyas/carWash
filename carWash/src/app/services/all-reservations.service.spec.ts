import { TestBed } from '@angular/core/testing';

import { AllReservationsService } from './all-reservations.service';

describe('AllReservationsService', () => {
  let service: AllReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
