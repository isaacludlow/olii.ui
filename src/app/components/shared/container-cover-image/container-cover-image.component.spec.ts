import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCoverImageComponent } from './container-cover-image.component';

describe('ContainerImageCoverComponent', () => {
  let component: ContainerCoverImageComponent;
  let fixture: ComponentFixture<ContainerCoverImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerCoverImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCoverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
