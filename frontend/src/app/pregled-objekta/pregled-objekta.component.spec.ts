import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledObjektaComponent } from './pregled-objekta.component';

describe('PregledObjektaComponent', () => {
  let component: PregledObjektaComponent;
  let fixture: ComponentFixture<PregledObjektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledObjektaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledObjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
