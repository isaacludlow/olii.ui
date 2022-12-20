import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, zip } from 'rxjs';
import { map, mergeAll, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { GroupPostComment } from 'src/app/models/dto/community/groups/group-post-comment.dto'
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SavedImagesAlbum } from 'src/app/models/dto/profile/saved-images-album.dto';
import { User } from 'src/app/models/dto/user/user.dto';
import { mapAttendees, mapEditEvent, mapEvent, mapEventRequest, mapEvents, mapGroup, mapGroupPosts, mapGroupRequest, mapProfile, mapSavedImagesAlbum, mapUser, mapGroupPostCommentRequest } from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) { }

  generateDocumentId(): string {
    return this.afs.createId();
  }
  
  getAllEvents(): Observable<Event[]> {
    const today = new Date();
    const allEvents = this.afs.collection('events', ref => ref.where('date', '>=', today)).valueChanges({ idField: 'id' }).pipe(
      map(allEvents => mapEvents(allEvents))
    );
      
    return allEvents;
  }

  getMyEvents(profileId: string): Observable<Event[]> {
    const myEvents = this.afs.collection<any>(`profiles/${profileId}/myEvents`).valueChanges().pipe(
      switchMap(events => zip(...events.map(event => this.getEventById(event.eventId))))
    );

    return myEvents;
  }

  getEventById(eventId: string): Observable<Event> {
    const event = this.afs.doc(`events/${eventId}`).valueChanges({ idField: 'id' }).pipe(
      map(event => mapEvent(event))
    );

    return event;
  }

  createEvent(event: Event): Observable<void> {
    const mappedEvent = mapEventRequest(event);

    const eventsCollectionRef = this.afs.collection('events');
    // Creates a reference to the new event doc that does not exists.
    // Source: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference
    const newEventDocRef = eventsCollectionRef.doc(event.EventId);

    // TODO: Return the eventId so we can route the UI to the newly created event.
    return from(newEventDocRef.set(mappedEvent)); // set() creates a new doc since it doesn't exist.
  }

  editEvent(eventRequest: Event): Observable<void> {
    const mappedEvent = mapEditEvent(eventRequest);

    return from(this.afs.doc(`events/${eventRequest.EventId}`).update(mappedEvent));
  }

  getEventAttendees(eventId: string): Observable<ProfilePreview[]> {
    const attendees = this.afs.collection(`events/${eventId}/attendees`).valueChanges().pipe(
      map(attendees => mapAttendees(attendees))
    );

    return attendees;
  }

  getMyGroups(profileId: string): Observable<Group[]> {
    const myGroups = this.afs.collection<any>(`profiles/${profileId}/myGroups`).valueChanges().pipe(
      switchMap(groupRef => zip(...groupRef.map(group => this.getGroupById(group.groupId))))
    );

    return myGroups;
  }

  getGroupById(groupId: string): Observable<Group> {
    const group = this.afs.doc(`groups/${groupId}`).valueChanges({ idField: 'id'}).pipe(
      map(group => mapGroup(group))
    );

    return group;
  }

  createGroup(group: Group): Observable<void> {
    const mappedGroup = mapGroupRequest(group);

    const groupsCollectionRef = this.afs.collection('groups');
    // Creates a reference to the new event doc that does not exists.
    // Source: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference
    const newGroupDocRef = groupsCollectionRef.doc(group.GroupId);

    return from(newGroupDocRef.set(mappedGroup)); // set() creates a new doc since it doesn't exist.
  }

  getLatestPosts(profileId: string, earliestPostDate: Date): Observable<GroupPost[]> {
    const groupPosts = this.afs.collection<any>(`profiles/${profileId}/myGroups`).valueChanges().pipe(
      switchMap(groupPreviews => zip(...groupPreviews.map(groupPreview => this.getPostsByGroupId(groupPreview.groupId, earliestPostDate)))),
      mergeAll()
    );

    return groupPosts;
  }

  getPostsByGroupId(groupId: string, earliestDate: Date): Observable<GroupPost[]> {
    const groupPosts = this.afs.collection<any>(`group_posts`, ref => ref.where('groupPreview.id', '==', groupId)
      .where('date', '>=', earliestDate)
      .orderBy('date', 'desc'))
      .valueChanges({ idField: 'id' }).pipe(
        map(groupPosts => mapGroupPosts(groupPosts))
      );

    return groupPosts;
  }

  getPastGroupEvents(groupId: string): Observable<Event[]> {
    const currentDateTime = new Date();
    const pastGroupEvents = this.afs.collection<any>(`groups/${groupId}/events`, ref => ref.where('date', '>=', currentDateTime)).valueChanges().pipe(
      switchMap(eventPreviews => zip(...eventPreviews.map(eventPreview => this.getEventById(eventPreview.eventId))))
    );

    return pastGroupEvents;
  }

  addCommentToGroupPost(newComment: GroupPostComment, groupPostId: string): Observable<Boolean> {
    const mappedGroup = mapGroupPostCommentRequest(newComment);

    const postCommentRef = this.afs.collection(`group_posts/${groupPostId}/comments`);

    return from(postCommentRef.add(mappedGroup)).pipe(map(()=> true)); //TODO: figure our how to return observable<void>
  }

  getFutureGroupEvents(groupId: string): Observable<Event[]> {
    const currentDateTime = new Date();
    const pastGroupEvents = this.afs.collection<any>(`groups/${groupId}/events`, ref => ref.where('date', '<=', currentDateTime)).valueChanges().pipe(
      switchMap(eventPreviews => zip(...eventPreviews.map(eventPreview => this.getEventById(eventPreview.eventId))))
    );

    return pastGroupEvents;
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
    