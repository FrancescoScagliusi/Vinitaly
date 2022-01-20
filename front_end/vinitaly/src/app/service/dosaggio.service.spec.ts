import { TestBed } from '@angular/core/testing';

import { DosaggioService } from './dosaggio.service';

describe('DosaggioService', () => {
  let service: DosaggioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosaggioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
