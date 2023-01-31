import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Event } from 'src/app/models/dto/community/events/event.dto';
import { GroupPostComment } from 'src/app/models/dto/community/groups/group-post-comment.dto'
import { GroupPost } from 'src/app/models/dto/community/groups/group-post.dto';
import { Group } from 'src/app/models/dto/community/groups/group.dto';
import { ProfilePreview } from 'src/app/models/dto/profile/profile-preview.dto';
import { Profile } from 'src/app/models/dto/profile/profile.dto';
import { SavedImagesAlbum } from 'src/app/models/dto/profile/saved-images-album.dto';
import { User } from 'src/app/models/dto/user/user.dto';
import { GroupRequest } from 'src/app/models/requests/community/groups/group-request';
import { mapAttendees, mapEvent, mapToEventRequest, mapEvents, mapGroup, mapGroupPosts, mapGroupRequest, mapProfile, mapSavedImagesAlbum, mapUser, mapGroupPostRequest, mapProfileRequest, mapUserRequest, mapGroupPostComments, mapGroupPostCommentRequest, mapProfilePreviewRequest, mapGroups, mapProfilePreview } from '../mappers';

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
    const mappedEvent = mapToEventRequest(event);

    const eventsCollectionRef = this.afs.collection('events');
    // Creates a reference to the new event doc that does not exist.
    // Source: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference
    const newEventDocRef = eventsCollectionRef.doc(event.EventId);

    // TODO: Return the eventId so we can route the UI to the newly created event.
    return from(newEventDocRef.set(mappedEvent)); // set() creates a new doc since it doesn't exist.
  }

  editEvent(event: Event): Observable<void> {
    const mappedEvent = mapToEventRequest(event);

    return from(this.afs.doc(`events/${event.EventId}`).update(mappedEvent));
  }

  getEventAttendees(eventId: string): Observable<ProfilePreview[]> {
    const attendees = this.afs.collection(`events/${eventId}/attendees`).valueChanges().pipe(
      map(attendees => mapAttendees(attendees))
    );

    return attendees;
  }

  isAttendingEvent(eventId: string, profileId: string): Observable<boolean> {
    return this.afs.collection(`events/${eventId}/attendees`, ref => ref.where('profileId', '==', profileId)).valueChanges().pipe(
      map(res => res.length > 0)
    );
  }

  rsvpToEvent(profilePreview: ProfilePreview, eventId: string): Observable<void> {
    const mappedProfilePreview = mapProfilePreviewRequest(profilePreview);
    return from(this.afs.collection(`events/${eventId}/attendees`).doc(profilePreview.ProfileId).set(mappedProfilePreview));
  }

  cancelRsvpToEvent(profileId: string, eventId: string): Observable<void> {
    return from(this.afs.doc(`events/${eventId}/attendees/${profileId}`).delete());
  }

  getMyGroups(profileId: string): Observable<Group[]> {
    const myGroups = this.afs.collection<any>(`profiles/${profileId}/myGroups`).valueChanges().pipe(
      switchMap(groupRef => zip(...groupRef.map(group => this.getGroupById(group.groupId))))
    );

    return myGroups;
  }

  getAllGroups(): Observable<Group[]> {
    const allGroups = this.afs.collection('groups').valueChanges({ idField: 'id' }).pipe(
      map(allGroups => mapGroups(allGroups))
    );
      
    return allGroups;
  }


  getGroupById(groupId: string): Observable<Group> {
    const group = this.afs.doc(`groups/${groupId}`).valueChanges({ idField: 'id'}).pipe(
      map(group => mapGroup(group))
    );

    return group;
  }

  addMemberToGroup(profilePreview: ProfilePreview, groupId: string): Observable<void> {
    const mappedProfilePreview = mapProfilePreviewRequest(profilePreview);

    return from(this.afs.collection(`groups/${groupId}/members`).doc(profilePreview.ProfileId).set(mappedProfilePreview));
  }

  createGroup(group: GroupRequest): Observable<void> {
    const mappedGroup = mapGroupRequest(group);

    const groupsCollectionRef = this.afs.collection('groups');
    // Creates a reference to the new event doc that does not exist.
    // Source: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference
    const newGroupDocRef = groupsCollectionRef.doc(group.GroupId);

    return from(newGroupDocRef.set(mappedGroup)); // set() creates a new doc since it doesn't exist.
  }

  editGroup(group: GroupRequest): Observable<void> {
    const mappedGroup = mapGroupRequest(group);

    return from(this.afs.doc(`groups/${group.GroupId}`).update(mappedGroup));
  }

  getLatestPosts(profileId: string, earliestPostDate: Date): Observable<GroupPost[]> {
    const groupPosts = this.afs.collection<any>(`profiles/${profileId}/myGroups`).valueChanges().pipe(
      switchMap(groupPreviews => zip(...groupPreviews.map(groupPreview => this.getPostsByGroupId(groupPreview.groupId, earliestPostDate)))),
        map(listOfGroupPosts => {
          const mergedArrayOfGroupPosts: GroupPost[] = [].concat.apply([], listOfGroupPosts); // Flattens out the array of arrays into one array.
          return mergedArrayOfGroupPosts;
        }),
    );

    return groupPosts;
  }

  leaveGroup(profileId: string, groupId: string): Observable<void> {
    return from(this.afs.doc(`group/${groupId}/members/${profileId}`).delete());
  }

  getGroupMembers(groupId: string): Observable<ProfilePreview[]> {
    const groupMembers = this.afs.collection<any>(`groups/${groupId}/members`).valueChanges().pipe(
      map(members => members.map(member => mapProfilePreview(member)))
    );

    return groupMembers;
  }

  getPostsByGroupId(groupId: string, earliestDate: Date): Observable<GroupPost[]> {
    const groupPosts = this.afs.collection<any>(`group_posts`, ref => ref.where('groupPreview.groupId', '==', groupId)
      .where('date', '>=', earliestDate)
      .orderBy('date', 'desc'))
      .valueChanges({ idField: 'id' }).pipe(
        map(groupPosts => mapGroupPosts(groupPosts))
      );

    return groupPosts;
  }

  createGroupPost(groupPost: GroupPost): Observable<void> {
    const mappedGroupPost = mapGroupPostRequest(groupPost);

    const groupsCollectionRef = this.afs.collection('group_posts');
    // Creates a reference to the new event doc that does not exist.
    // Source: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference
    const newGroupDocRef = groupsCollectionRef.doc(groupPost.GroupPostId);

    return from(newGroupDocRef.set(mappedGroupPost)); // set() creates a new doc since it doesn't exist.
  }

  deleteGroupPost(postId: string): Observable<void> {
    return from(this.afs.doc(`group_posts/${postId}`).delete());
  }

  getPastGroupEvents(groupId: string): Observable<Event[]> {
    const currentDateTime = new Date();
    const pastGroupEvents = this.afs.collection<any>(`groups/${groupId}/events`, ref => ref.where('date', '>=', currentDateTime)).valueChanges().pipe(
      switchMap(eventPreviews => zip(...eventPreviews.map(eventPreview => this.getEventById(eventPreview.eventId))))
    );

    return pastGroupEvents;
  }

  createCommentOnGroupPost(newComment: GroupPostComment, groupPostId: string): Observable<void> {
    const mappedComment = mapGroupPostCommentRequest(newComment)
    const postCommentRef = this.afs.collection<any>(`group_posts/${groupPostId}/comments`);

    return from(postCommentRef.add(mappedComment)).pipe(map(() => {})); //TODO: figure our how to return observable<void>
  }

  getCommentsByGroupPostId(groupPostId: string): Observable<GroupPostComment[]> {
    const comments = this.afs.collection<any>(`group_posts/${groupPostId}/comments`).valueChanges().pipe(
      map(comments => mapGroupPostComments(comments))
    );

    return comments;
  }

  getFutureGroupEvents(groupId: string): Observable<Event[]> {
    const currentDateTime = new Date();
    const pastGroupEvents = this.afs.collection<any>(`groups/${groupId}/events`, ref => ref.where('date', '<=', currentDateTime)).valueChanges().pipe(
      switchMap(eventPreviews => zip(...eventPreviews.map(eventPreview => this.getEventById(eventPreview.eventId))))
    );

    return pastGroupEvents;
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.afs.collection(`usernames`, ref => ref.where('username', '==', username)).get().pipe(
      map(res => res.size === 0)
    );
  }

  getUserByUid(uid: string): Observable<User> {
    const user = this.afs.doc(`users/${uid}`).valueChanges({ idField: 'uid' }).pipe(
      map(user => mapUser(user))
    );
      
    return user;
  }
    
  createUser(newUser: User): Observable<void> {
    const mappedUser = mapUserRequest(newUser);
    
    return from(this.afs.doc(`users/${newUser.Uid}`).set(mappedUser));
  }
  
  getProfileById(id: string): Observable<Profile> {
    const profile = this.afs.doc(`profiles/${id}`).valueChanges({ idField: 'id' }).pipe(
      map(profile => mapProfile(profile))
    );

    return profile;
  }

  createProfile(newProfile: Profile): Observable<void> {
	  const mappedProfile = mapProfileRequest(newProfile);

    return from(this.afs.doc(`profiles/${newProfile.ProfileId}`).set(mappedProfile));
  }

  updateProfile(profile: Profile): Observable<void> {
    const mappedProfile = mapProfileRequest(profile);

    return from(this.afs.doc(`profiles/${profile.ProfileId}`).update(mappedProfile));
  }

  getSavedImagesAlbum(profileId: string, savedImagesAlbumId: string): Observable<SavedImagesAlbum>{
	  const savedImagesAlbum = this.afs.doc(`profiles/${profileId}/savedImagesAlbums/${savedImagesAlbumId}`).valueChanges({ idField: 'id' }).pipe(
      map(savedImagesAlbum => mapSavedImagesAlbum(savedImagesAlbum))
    );

    return savedImagesAlbum;
  }
}
    