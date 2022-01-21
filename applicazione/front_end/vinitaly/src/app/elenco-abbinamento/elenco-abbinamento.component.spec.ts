import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoAbbinamentoComponent } from './elenco-abbinamento.component';

describe('ElencoAbbinamentoComponent', () => {
  let component: ElencoAbbinamentoComponent;
  let fixture: ComponentFixture<ElencoAbbinamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoAbbinamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoAbbinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
