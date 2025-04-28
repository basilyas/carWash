import { TestBed } from '@angular/core/testing';

import { SystemStatisticsService } from './system-statistics.service';

describe('SystemStatisticsService', () => {
  let service: SystemStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
