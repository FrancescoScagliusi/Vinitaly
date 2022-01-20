import { TestBed } from '@angular/core/testing';

import { AromaService } from './aroma.service';

describe('AromaService', () => {
  let service: AromaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AromaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
