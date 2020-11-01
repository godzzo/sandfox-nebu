import { TestBed } from '@angular/core/testing';

import { SandfoxNebuFormControlsService } from './sandfox-nebu-form-controls.service';

describe('SandfoxNebuFormControlsService', () => {
  let service: SandfoxNebuFormControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SandfoxNebuFormControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
