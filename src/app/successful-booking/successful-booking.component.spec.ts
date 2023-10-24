import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulBookingComponent } from './successful-booking.component';

describe('SuccessfulBookingComponent', () => {
  let component: SuccessfulBookingComponent;
  let fixture: ComponentFixture<SuccessfulBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
