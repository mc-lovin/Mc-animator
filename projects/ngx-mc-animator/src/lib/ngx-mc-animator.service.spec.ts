import { TestBed } from '@angular/core/testing';

import { NgxMcAnimatorService } from './ngx-mc-animator.service';

describe('NgxMcAnimatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMcAnimatorService = TestBed.get(NgxMcAnimatorService);
    expect(service).toBeTruthy();
  });
});
