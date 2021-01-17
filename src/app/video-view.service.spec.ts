import { TestBed } from '@angular/core/testing';

import { VideoViewService } from './video-view.service';

describe('VideoViewService', () => {
  let service: VideoViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
