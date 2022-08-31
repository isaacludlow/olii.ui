import { DomSanitizer } from '@angular/platform-browser';
import { Camera, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PartialProfile } from '../models/dto/profile/partial-profile.dto';
import { EventsFeatureStore } from './services/community/events-feature/events-feature.store';

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

export function removeAttendeeFromCachedEvents(profileId: number, eventId: number, eventStore: EventsFeatureStore): void {
  const allEvents = eventStore.allEvents.value;

  let attendees = allEvents.find(e => e.EventId === eventId).AttendeeProfiles;
  let attendeeIndex = attendees.findIndex(x => x.Id === profileId);
  attendees.splice(attendeeIndex, 1);
  eventStore.allEvents.next(allEvents);

  let myEvents = eventStore.myEvents.value;

  attendees = myEvents.find(e => e.EventId === eventId).AttendeeProfiles;
  attendeeIndex = attendees.findIndex(x => x.Id === profileId);
  attendees.splice(attendeeIndex, 1);
  eventStore.myEvents.next(myEvents);
}

export function addAttendeeToCachedEvents(partialProfile: PartialProfile, eventId: number, eventStore: EventsFeatureStore): void {
  const allEvents = eventStore.allEvents.value;
  
  let attendees = allEvents.find(e => e.EventId === eventId).AttendeeProfiles;
  attendees.push(partialProfile);
  eventStore.allEvents.next(allEvents);

  let myEvents = eventStore.myEvents.value;

  attendees = myEvents.find(e => e.EventId === eventId).AttendeeProfiles;
  eventStore.myEvents.next(myEvents);
  attendees.push(partialProfile);
}
