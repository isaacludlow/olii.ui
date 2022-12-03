import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable, zip } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  constructor(private storageService: AngularFireStorage) { }

  uploadFile(base64EncodedString: string, cloudFilePath: string): Observable<{
    UploadProgressPercentage$: Observable<number>;
    DownloadUrl$: Observable<string>;
  }> {
    const filePathRef = this.storageService.ref(cloudFilePath);
    const task = filePathRef.putString(base64EncodedString, 'data_url');
    task.catch(error => {
      switch (error.name) {
        case 'storage/unauthenticated':
          alert('User is unauthenticated, please login and try again.');
          break;
        case 'storage/unauthorized':
          alert('You do not have permission to perform this action');
          break;
        default:
          alert('There was an error. Please check your input and try again. If the problem persists, please contact us through our website.')
          break;
      }
    });

    const uploadPercentage = task.percentageChanges();
    let downloadUrl: Observable<string>;

    // The toPromise() forces this to wait for the finalize method to be called before returning the download url.
    // Previously, the download url was getting retrieved before the image finished uploading causing an error.
    return from(task.snapshotChanges().pipe(
      finalize(() => downloadUrl = filePathRef.getDownloadURL())
    ).toPromise()) // TODO: See if removing the from and the toPromise results in an error.
    .pipe(map(() => {
      return { UploadProgressPercentage$: uploadPercentage, DownloadUrl$: downloadUrl }
    }));
  }

  uploadFiles(base64EncodedStrings: string[], cloudFilePath: string): Observable<string[]> {
    const downloadUrls = zip(...base64EncodedStrings.map(imageData => this.uploadFile(imageData, cloudFilePath))).pipe(
      switchMap(uploadFileObservableList => zip(uploadFileObservableList.map(obs => obs.DownloadUrl$)))
    );

    return downloadUrls;
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
