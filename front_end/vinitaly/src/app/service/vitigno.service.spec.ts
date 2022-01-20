import { TestBed } from '@angular/core/testing';

import { VitignoService } from './vitigno.service';

describe('VitignoService', () => {
  let service: VitignoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitignoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
