import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaEmpreendedorComponent } from './loja-empreendedor.component';

describe('LojaEmpreendedorComponent', () => {
  let component: LojaEmpreendedorComponent;
  let fixture: ComponentFixture<LojaEmpreendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaEmpreendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaEmpreendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
