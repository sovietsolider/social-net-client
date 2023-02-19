import { TestBed } from '@angular/core/testing';

import { RealTimeNewsService } from './real-time-news.service';

describe('RealTimeNewsService', () => {
  let service: RealTimeNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
