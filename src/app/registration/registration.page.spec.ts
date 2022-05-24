import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPage } from './registration.page';

describe('RegistrationComponent', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
