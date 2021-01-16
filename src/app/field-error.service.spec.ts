import { TestBed } from '@angular/core/testing';

import { FieldErrorService } from './field-error.service';

describe('FieldErrorService', () => {
  let service: FieldErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
