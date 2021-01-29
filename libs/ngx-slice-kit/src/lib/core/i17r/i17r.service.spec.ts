import { TestBed } from '@angular/core/testing';

import { I17rService } from './i17r.service';

describe('I17rService', () => {
  let service: I17rService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I17rService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
