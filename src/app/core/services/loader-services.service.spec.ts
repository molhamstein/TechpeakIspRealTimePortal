import { TestBed, inject } from '@angular/core/testing';

import { LoaderServicesService } from './loader-services.service';

describe('LoaderServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderServicesService]
    });
  });

  it('should be created', inject([LoaderServicesService], (service: LoaderServicesService) => {
    expect(service).toBeTruthy();
  }));
});
