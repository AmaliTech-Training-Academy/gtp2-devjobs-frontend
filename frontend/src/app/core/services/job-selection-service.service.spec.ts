import { TestBed } from '@angular/core/testing';

import { JobSelectionServiceService } from './job-selection-service.service';

describe('JobSelectionServiceService', () => {
  let service: JobSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
