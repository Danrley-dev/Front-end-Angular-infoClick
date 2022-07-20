import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaEdicaoComponent } from './loja-edicao.component';

describe('LojaEdicaoComponent', () => {
  let component: LojaEdicaoComponent;
  let fixture: ComponentFixture<LojaEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LojaEdicaoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

