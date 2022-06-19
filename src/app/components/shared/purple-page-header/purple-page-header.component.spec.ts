import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurplePageHeaderComponent } from './purple-page-header.component';

describe('PurplePageHeaderComponent', () => {
  let component: PurplePageHeaderComponent;
  let fixture: ComponentFixture<PurplePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurplePageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurplePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
