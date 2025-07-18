import { TestBed } from '@angular/core/testing';

import { ModalsServiceService } from './modals-service.service';

describe('ModalsServiceService', () => {
  let service: ModalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
