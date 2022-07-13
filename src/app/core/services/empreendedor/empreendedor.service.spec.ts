import { TestBed } from '@angular/core/testing';

import { EmpreendedorService } from './empreendedor.service';

describe('EmpreendedorService', () => {
  let service: EmpreendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpreendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
