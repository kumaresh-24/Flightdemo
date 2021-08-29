import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllflightdetailsComponent } from './allflightdetails.component';

describe('AllflightdetailsComponent', () => {
  let component: AllflightdetailsComponent;
  let fixture: ComponentFixture<AllflightdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllflightdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllflightdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
