import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  constructor(private storageService: AngularFireStorage) { }

  uploadFile(base64EncodedString: string, cloudFilePath: string): { UploadProgressPercentage$: Observable<number>, DownloadUrl$: Observable<string> } {
    const filePathRef = this.storageService.ref(cloudFilePath);
    const task = filePathRef.putString(base64EncodedString, 'data_url');
    const uploadPercentage = task.percentageChanges();

    const downloadUrl = filePathRef.getDownloadURL();

    return { UploadProgressPercentage$: uploadPercentage, DownloadUrl$: downloadUrl };
  }

  // Might need this in the future to block certain file types.
  private findFileType(base64EncodedString: string): string {
    const imageString = base64EncodedString.split(',').pop()

    if (imageString.startsWith('image/jpeg', 5)) {
      return 'image/jpeg';
    } else if (imageString.startsWith('image/png', 5)) {
      return 'image/png';
    }
  }
}
