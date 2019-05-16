import { TestBed } from '@angular/core/testing';

import { CockpitService } from './cockpit.service';

describe('CockpitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CockpitService = TestBed.get(CockpitService);
    expect(service).toBeTruthy();
  });
});
