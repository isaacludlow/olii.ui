import { DomSanitizer } from '@angular/platform-browser';
import { Camera, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export function selectImages(maxNumberOfImages: number): Observable<GalleryPhoto[]> {
    const galleryPhoto = from(Camera.pickImages({limit: maxNumberOfImages}));

    return galleryPhoto.pipe(
        map(galleryPhoto => galleryPhoto.photos.slice(0, maxNumberOfImages))
    );
}

export async function readPhotoAsBase64(photo: GalleryPhoto | Photo, platform: Platform): Promise<string> {
    if (platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      // TODO: convert this to use observables so the user gets one image at a time instead of waiting for all to be done.
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
  
      return await convertBlobToBase64(blob);
    }
  }

  export function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
}
