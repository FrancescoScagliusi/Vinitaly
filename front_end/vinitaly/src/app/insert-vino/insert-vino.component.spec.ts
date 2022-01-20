import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVinoComponent } from './insert-vino.component';

describe('InsertVinoComponent', () => {
  let component: InsertVinoComponent;
  let fixture: ComponentFixture<InsertVinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertVinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertVinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
