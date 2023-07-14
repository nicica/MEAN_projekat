import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjekatComponent } from './new-objekat.component';

describe('NewObjekatComponent', () => {
  let component: NewObjekatComponent;
  let fixture: ComponentFixture<NewObjekatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewObjekatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewObjekatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
