import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { User } from 'src/app/models/dto/user/user.dto';
import { mapEvents, mapProfile, mapUser } from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private afs: AngularFirestore) { }
  
  getAllEvents(): Observable<Event[]> {
    const today = new Date();
    const allEventsCollectionRef = this.afs.collection('events', ref => ref.where('date', '>=', today));
    const allEvents = allEventsCollectionRef.valueChanges({ idField: 'id' }).pipe(
      map(allEvents => mapEvents(allEvents))
      );
      
    return allEvents;
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
}
    