import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsumidorComponent } from './edit-consumidor.component';

describe('EditConsumidorComponent', () => {
  let component: EditConsumidorComponent;
  let fixture: ComponentFixture<EditConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConsumidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
