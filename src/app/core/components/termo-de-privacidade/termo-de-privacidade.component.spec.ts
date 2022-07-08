import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoDePrivacidadeComponent } from './termo-de-privacidade.component';

describe('TermoDePrivacidadeComponent', () => {
  let component: TermoDePrivacidadeComponent;
  let fixture: ComponentFixture<TermoDePrivacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoDePrivacidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoDePrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
