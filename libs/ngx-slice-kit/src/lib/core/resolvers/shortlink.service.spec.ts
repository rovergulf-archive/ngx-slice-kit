import { TestBed } from '@angular/core/testing';

import { ShortlinkService } from './shortlink.service';

describe('ShortlinkService', () => {
  let service: ShortlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
