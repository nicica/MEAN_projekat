import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgencijaComponent } from './edit-agencija.component';

describe('EditAgencijaComponent', () => {
  let component: EditAgencijaComponent;
  let fixture: ComponentFixture<EditAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
