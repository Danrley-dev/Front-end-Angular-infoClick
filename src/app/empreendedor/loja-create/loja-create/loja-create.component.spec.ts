import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaCreateComponent } from './loja-create.component';

describe('LojaCreateComponent', () => {
  let component: LojaCreateComponent;
  let fixture: ComponentFixture<LojaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LojaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
