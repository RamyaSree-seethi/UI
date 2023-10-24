import { TestBed } from '@angular/core/testing';

import { DeletedRefundService } from './deleted-refund.service';

describe('DeletedRefundService', () => {
  let service: DeletedRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
