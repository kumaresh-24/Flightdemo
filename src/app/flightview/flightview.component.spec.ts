import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightviewComponent } from './flightview.component';

describe('FlightviewComponent', () => {
  let component: FlightviewComponent;
  let fixture: ComponentFixture<FlightviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
