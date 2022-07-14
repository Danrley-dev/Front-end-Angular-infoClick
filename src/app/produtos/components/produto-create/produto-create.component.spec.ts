import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCreateComponent } from './produto-create.component';

describe('ProdutoCreateComponent', () => {
  let component: ProdutoCreateComponent;
  let fixture: ComponentFixture<ProdutoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
