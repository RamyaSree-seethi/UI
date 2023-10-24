import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSuccessComponent } from './refund-success.component';

describe('RefundSuccessComponent', () => {
  let component: RefundSuccessComponent;
  let fixture: ComponentFixture<RefundSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundSuccessComponent]
    });
    fixture = TestBed.createComponent(RefundSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
