import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniRegioneComponent } from './vini-regione.component';

describe('ViniRegioneComponent', () => {
  let component: ViniRegioneComponent;
  let fixture: ComponentFixture<ViniRegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViniRegioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViniRegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
