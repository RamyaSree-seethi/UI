import { TestBed } from '@angular/core/testing';

import { RegisterationsService } from './registerations.service';

describe('RegisterationsService', () => {
  let service: RegisterationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
