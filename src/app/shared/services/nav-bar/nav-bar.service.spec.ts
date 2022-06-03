import { TestBed } from '@angular/core/testing';

import { NavBarService } from './nav-bar.service';

describe('NavBarService', () => {
  let service: NavBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getter for the current navBarVisibility value', () => {
    it('should return the current navBarVisibility', () => {
      service.navBarVisibility.next(true);

      const currentValue = service.navBarVisibilityValue;

      expect(currentValue).toBeTruthy();
    });
  });

  describe('setNavBarVisibility', () => {
    it('should set the navBarVisibility', () => {
      service.navBarVisibility.next(false);

      service.setNavBarVisibility(true);

      expect(service.navBarVisibility.value).toBe(true);
    });
  });
});
