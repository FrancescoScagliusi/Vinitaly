import { TestBed } from '@angular/core/testing';

import { ViniService } from './vini.service';

describe('ViniService', () => {
  let service: ViniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
