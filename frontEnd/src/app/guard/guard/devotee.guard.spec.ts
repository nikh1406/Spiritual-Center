import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { devoteeGuard } from './devotee.guard';

describe('devoteeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => devoteeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
