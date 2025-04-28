import { TestBed } from '@angular/core/testing';

import { AllPartnersService } from './all-partners.service';

describe('AllPartnersService', () => {
  let service: AllPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
