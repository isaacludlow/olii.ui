import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerImageCoverComponent } from './container-image-cover.component';

describe('ContainerImageCoverComponent', () => {
  let component: ContainerImageCoverComponent;
  let fixture: ComponentFixture<ContainerImageCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerImageCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerImageCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
