import { TestBed } from '@angular/core/testing';

import { ExternalAuthGuard } from './external-auth.guard';

describe('ExternalAuthGuard', () => {
  let guard: ExternalAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExternalAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
