import { TestBed } from '@angular/core/testing';

import { PortateService } from './portate.service';

describe('PortateService', () => {
  let service: PortateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
