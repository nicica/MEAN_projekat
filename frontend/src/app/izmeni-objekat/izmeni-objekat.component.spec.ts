import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniObjekatComponent } from './izmeni-objekat.component';

describe('IzmeniObjekatComponent', () => {
  let component: IzmeniObjekatComponent;
  let fixture: ComponentFixture<IzmeniObjekatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniObjekatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmeniObjekatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
