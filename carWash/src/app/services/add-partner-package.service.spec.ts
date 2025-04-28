import { TestBed } from '@angular/core/testing';

import { AddPartnerPackageService } from './add-partner-package.service';

describe('AddPartnerPackageService', () => {
  let service: AddPartnerPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPartnerPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
