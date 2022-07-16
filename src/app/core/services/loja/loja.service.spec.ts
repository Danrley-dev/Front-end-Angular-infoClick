import { TestBed } from '@angular/core/testing';

import { LojaService } from './loja.service';

describe('LojaService', () => {
  let service: LojaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LojaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
