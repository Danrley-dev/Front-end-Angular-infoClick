import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDetailComponent } from './produto-detail.component';

describe('ProdutoDetailComponent', () => {
  let component: ProdutoDetailComponent;
  let fixture: ComponentFixture<ProdutoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
