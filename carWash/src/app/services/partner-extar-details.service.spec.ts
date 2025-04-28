import { TestBed } from '@angular/core/testing';

import { PartnerExtarDetailsService } from './partner-extar-details.service';

describe('PartnerExtarDetailsService', () => {
  let service: PartnerExtarDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerExtarDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
