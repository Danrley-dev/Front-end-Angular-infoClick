import { TestBed } from '@angular/core/testing';

import { ConsumidorService } from './consumidor.service';

describe('ConsumidorService', () => {
  let service: ConsumidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
