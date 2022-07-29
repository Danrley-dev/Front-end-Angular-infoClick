import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoConsumidorComponent } from './graficoConsumidor.component';

describe('GraficoComponent', () => {
  let component: GraficoConsumidorComponent;
  let fixture: ComponentFixture<GraficoConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoConsumidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
