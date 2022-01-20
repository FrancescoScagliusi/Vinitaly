import { TestBed } from '@angular/core/testing';

import { CantinaService } from './cantina.service';

describe('CantinaService', () => {
  let service: CantinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
