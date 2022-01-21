import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViniCantinaComponent } from './vini-cantina.component';

describe('ViniCantinaComponent', () => {
  let component: ViniCantinaComponent;
  let fixture: ComponentFixture<ViniCantinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViniCantinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViniCantinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
