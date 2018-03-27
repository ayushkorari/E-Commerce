import { TestBed, inject } from '@angular/core/testing';

import { ProductPageService } from './product-page.service';

describe('ProductPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductPageService]
    });
  });

  it('should be created', inject([ProductPageService], (service: ProductPageService) => {
    expect(service).toBeTruthy();
  }));
});
