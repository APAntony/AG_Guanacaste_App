import { TestBed } from '@angular/core/testing';

import { TouristicAreasService } from './touristic-areas.service';

describe('TouristicAreasService', () => {
  let service: TouristicAreasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristicAreasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
