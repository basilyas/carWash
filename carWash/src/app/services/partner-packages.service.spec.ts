import { TestBed } from '@angular/core/testing';

import { PartnerPackagesService } from './partner-packages.service';

describe('PartnerPackagesService', () => {
  let service: PartnerPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
