import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupPage } from './edit-group.page';

describe('EditGroupPage', () => {
  let component: EditGroupPage;
  let fixture: ComponentFixture<EditGroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGroupPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
