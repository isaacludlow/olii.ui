import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFlowPage } from './registration-flow.page';

describe('RegistrationFlowPage', () => {
  let component: RegistrationFlowPage;
  let fixture: ComponentFixture<RegistrationFlowPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationFlowPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
