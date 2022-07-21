import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaEditComponent } from './loja-edit.component';

describe('LojaEditComponent', () => {
  let component: LojaEditComponent;
  let fixture: ComponentFixture<LojaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
