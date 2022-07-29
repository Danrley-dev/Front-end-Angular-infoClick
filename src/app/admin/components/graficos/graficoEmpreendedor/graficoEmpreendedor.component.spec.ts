import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEmpreendedorComponent } from './graficoEmpreendedor.component';

describe('GraficoComponent', () => {
  let component: GraficoEmpreendedorComponent;
  let fixture: ComponentFixture<GraficoEmpreendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoEmpreendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoEmpreendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
