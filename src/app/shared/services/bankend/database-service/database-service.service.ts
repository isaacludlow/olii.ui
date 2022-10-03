import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SavedImagesAlbum } from 'src/app/models/dto/profile/saved-images-album.dto';
import { User } from 'src/app/models/dto/user/user.dto';
import { EventRequest } from 'src/app/models/requests/community/events/event-request';
import { mapAttendees, mapEvent, mapEvents, mapProfile, mapSavedImagesAlbum, mapUser } from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) { }
  
  getAllEvents(): Observable<Event[]> {
    const today = new Date();
    const allEvents = this.afs.collection('events', ref => ref.where('date', '>=', today)).valueChanges({ idField: 'id' }).pipe(
      map(allEvents => mapEvents(allEvents))
    );
      
    return allEvents;
  }

  getMyEvents(profileId: string): Observable<Event[]> {
    const myEvents = this.afs.collection<any>(`profiles/${profileId}/myEvents`).valueChanges().pipe(
      switchMap(events => {
        return zip(...events.map(event => this.getEventById(event.eventId)));
      })
    );

    return myEvents;
  }

  getEventById(eventId: string): Observable<Event> {
    const event = this.afs.doc(`events/${eventId}`).valueChanges({ idField: 'id' }).pipe(
      map(event => mapEvent(event))
    );

    return event;
  }

  createEvent(event: EventRequest): Observable<Event> {
    const eventsCollectionRef = this.afs.collection(`events`);
    return from(eventsCollectionRef.add(event)).pipe(map(event => mapEvent(event)));
  }

  getEventAttendees(eventId: string): Observable<ProfilePreview[]> {
    const attendees = this.afs.collection(`events/${eventId}/attendees`).valueChanges().pipe(
      map(attendees => mapAttendees(attendees))
    );

    return attendees;
  }

  
    
  getUserByUid(uid: string): Observable<User> {
    const user = this.afs.doc(`users/${uid}`).valueChanges({ idField: 'uid' }).pipe(
      map(user => mapUser(user))
    );
      
    return user;
  }
    
  createUser(newUser: User): Observable<User> {
    throw new Error("Method not implemented.");
  }
  
  getProfileById(id: string): Observable<Profile> {
    const profile = this.afs.doc(`profiles/${id}`).valueChanges({ idField: 'id' }).pipe(
      map(profile => mapProfile(profile))
    );

    return profile;
  }

  getSavedImagesAlbum(profileId: string, savedImagesAlbumId: string): Observable<SavedImagesAlbum>{
	  const savedImagesAlbum = this.afs.doc(`profiles/${profileId}/savedImagesAlbums/${savedImagesAlbumId}`).valueChanges({ idField: 'id' }).pipe(
      map(savedImagesAlbum => mapSavedImagesAlbum(savedImagesAlbum))
    );

    return savedImagesAlbum;
  }
}
    