import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedBookingComponent } from './modified-booking.component';

describe('ModifiedBookingComponent', () => {
  let component: ModifiedBookingComponent;
  let fixture: ComponentFixture<ModifiedBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiedBookingComponent]
    });
    fixture = TestBed.createComponent(ModifiedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
