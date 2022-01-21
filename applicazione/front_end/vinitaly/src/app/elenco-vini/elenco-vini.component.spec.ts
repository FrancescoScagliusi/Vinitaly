import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoViniComponent } from './elenco-vini.component';

describe('ElencoViniComponent', () => {
  let component: ElencoViniComponent;
  let fixture: ComponentFixture<ElencoViniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoViniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoViniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
