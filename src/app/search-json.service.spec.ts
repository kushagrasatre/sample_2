import { TestBed } from '@angular/core/testing';

import { SearchJsonService } from './search-json.service';

describe('SearchJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchJsonService = TestBed.get(SearchJsonService);
    expect(service).toBeTruthy();
  });
});
