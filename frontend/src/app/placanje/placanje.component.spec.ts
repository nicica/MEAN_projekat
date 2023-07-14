import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacanjeComponent } from './placanje.component';

describe('PlacanjeComponent', () => {
  let component: PlacanjeComponent;
  let fixture: ComponentFixture<PlacanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
