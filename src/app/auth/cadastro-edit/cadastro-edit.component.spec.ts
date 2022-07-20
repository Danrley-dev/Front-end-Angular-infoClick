import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEditComponent } from './cadastro-edit.component';

describe('CadastroEditComponent', () => {
  let component: CadastroEditComponent;
  let fixture: ComponentFixture<CadastroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
