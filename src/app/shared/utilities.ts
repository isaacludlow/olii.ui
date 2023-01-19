import { Camera, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function selectImages(maxNumberOfImages: number): Observable<GalleryPhoto[]> {
    const galleryPhoto = from(Camera.pickImages({
      limit: maxNumberOfImages,

    }));

    return galleryPhoto.pipe(
        map(galleryPhoto => galleryPhoto.photos.slice(0, maxNumberOfImages))
    );
}

export async function readPhotoAsBase64(photo: GalleryPhoto | Photo, platform: Platform): Promise<string> {
  console.log(photo)
    if (platform.is('hybrid')) {
      console.log('is hybrid')
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });
      console.log(file)
  
      return `data:image/jpeg;base64,${file.data}`;
    }
    else {
      console.log('is not hybrid')
      // Fetch the photo, read as a blob, then convert to base64 format
      // TODO: convert this to use observables so the user gets one image at a time instead of waiting for all to be done.
      const response = await fetch(photo.webPath, {
        mode: "no-cors"
      });
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

export function getItemsThatAreInBothArrays<Type>(array1: Type[], array2: Type[]): Type[] {
  return array1.filter(x => array2.includes(x));
}

export function getItemsFromFirstArrayThatAreNotInSecondArray<Type>(array1: Type[], array2: Type[]): Type[] {
  return array1.filter(x => !array2.includes(x));
}

export function getAllElementsThatAreInBothArrays<Type>(array1: Type[], array2: Type[]): Type[] {
  return array1.filter(x => !array2.includes(x))
    .concat(array2.filter(x => !array1.includes(x)));
}
