import { TestBed } from '@angular/core/testing';

import { OceneService } from './ocene.service';

describe('OceneService', () => {
  let service: OceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
