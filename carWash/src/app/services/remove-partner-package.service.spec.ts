import { TestBed } from '@angular/core/testing';

import { RemovePartnerPackageService } from './remove-partner-package.service';

describe('RemovePartnerPackageService', () => {
  let service: RemovePartnerPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovePartnerPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
