import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniSomigliantiComponent } from './vini-somiglianti.component';

describe('ViniSomigliantiComponent', () => {
  let component: ViniSomigliantiComponent;
  let fixture: ComponentFixture<ViniSomigliantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViniSomigliantiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViniSomigliantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
