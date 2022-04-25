import { TestBed } from '@angular/core/testing';

import { AccessibilitiesService } from './accessibilities.service';

describe('AccessibilitiesService', () => {
  let service: AccessibilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
