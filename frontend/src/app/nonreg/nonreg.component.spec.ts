import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonregComponent } from './nonreg.component';

describe('NonregComponent', () => {
  let component: NonregComponent;
  let fixture: ComponentFixture<NonregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
