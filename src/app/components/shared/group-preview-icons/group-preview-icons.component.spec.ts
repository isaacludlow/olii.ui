import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPreviewIconsComponent } from './group-preview-icons.component';

describe('GroupPreviewIconsComponent', () => {
  let component: GroupPreviewIconsComponent;
  let fixture: ComponentFixture<GroupPreviewIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPreviewIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPreviewIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
