import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniOccasioneComponent } from './vini-occasione.component';

describe('ViniOccasioneComponent', () => {
  let component: ViniOccasioneComponent;
  let fixture: ComponentFixture<ViniOccasioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViniOccasioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViniOccasioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
