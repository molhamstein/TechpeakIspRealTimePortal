import { TestBed, inject } from '@angular/core/testing';
import { AppDirectionService } from './app-direction.service';

describe('AppDirectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDirectionService]
    });
  });

  it('should be created', inject([AppDirectionService], (service: AppDirectionService) => {
    expect(service).toBeTruthy();
  }));
});
