import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarService } from './shared/services/nav-bar/nav-bar.service';

class MockNavBarService {
  navBarVisibility = of(true);
  setNavBarVisibility() {}
}

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AppRoutingModule
      ],
      providers: [
        { provide: NavBarService, useClass: MockNavBarService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
