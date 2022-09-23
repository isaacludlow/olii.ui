import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { mapEvents } from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore) { }

  getAllEvents() {
    const allEventsCollectionRef = this.afs.collection<Event>('events');
    const allEvents = allEventsCollectionRef.valueChanges({ idField: 'id' }).pipe(map(allEvents => mapEvents(allEvents)));

    return allEvents;
  }
}
