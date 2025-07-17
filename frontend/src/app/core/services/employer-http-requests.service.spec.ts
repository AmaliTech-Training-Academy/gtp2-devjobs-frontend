import { TestBed } from '@angular/core/testing';

import { EmployerHttpRequestsService } from './employer-http-requests.service';

describe('EmployerHttpRequestsService', () => {
  let service: EmployerHttpRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerHttpRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
