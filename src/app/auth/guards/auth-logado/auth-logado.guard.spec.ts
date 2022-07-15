import { TestBed } from '@angular/core/testing';

import { AuthLogadoGuard } from './auth-logado.guard';

describe('AuthLogadoGuard', () => {
  let guard: AuthLogadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLogadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
