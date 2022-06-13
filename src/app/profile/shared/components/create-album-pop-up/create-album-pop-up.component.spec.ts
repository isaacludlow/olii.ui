import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumPopUpComponent } from './create-album-pop-up.component';

describe('CreateAlbumPopUpComponent', () => {
  let component: CreateAlbumPopUpComponent;
  let fixture: ComponentFixture<CreateAlbumPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlbumPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
