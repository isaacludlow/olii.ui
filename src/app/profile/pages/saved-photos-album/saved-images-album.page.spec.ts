import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedImagesAlbumPage } from './saved-images-album.page';

describe('SavedPhotosAlbumPage', () => {
  let component: SavedImagesAlbumPage;
  let fixture: ComponentFixture<SavedImagesAlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedImagesAlbumPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedImagesAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
