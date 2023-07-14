import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassAComponent } from './change-pass-a.component';

describe('ChangePassAComponent', () => {
  let component: ChangePassAComponent;
  let fixture: ComponentFixture<ChangePassAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePassAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePassAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
