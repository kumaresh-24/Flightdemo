import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInComponent } from './flight-in.component';

describe('FlightInComponent', () => {
  let component: FlightInComponent;
  let fixture: ComponentFixture<FlightInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
