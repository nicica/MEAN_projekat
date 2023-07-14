import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceneComponent } from './ocene.component';

describe('OceneComponent', () => {
  let component: OceneComponent;
  let fixture: ComponentFixture<OceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
