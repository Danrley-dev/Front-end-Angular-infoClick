import { TestBed } from '@angular/core/testing';

import { RoleEmpreendedorGuard } from './role-empreendedor.guard';

describe('RoleEmpreendedorGuard', () => {
  let guard: RoleEmpreendedorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleEmpreendedorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
