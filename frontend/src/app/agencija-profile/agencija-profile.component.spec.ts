import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaProfileComponent } from './agencija-profile.component';

describe('AgencijaProfileComponent', () => {
  let component: AgencijaProfileComponent;
  let fixture: ComponentFixture<AgencijaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
