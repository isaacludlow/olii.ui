import { DocumentData } from "@angular/fire/firestore";
import { Event } from "src/app/models/dto/community/events/event.dto";
import { GroupPost } from "src/app/models/dto/community/groups/group-post.dto";
import { Group } from "src/app/models/dto/community/groups/group.dto";
import { GroupPreview } from "src/app/models/dto/community/groups/group-preview.dto";
import { Creator } from "src/app/models/dto/misc/entity-preview.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SavedImagesAlbumPreview } from "src/app/models/dto/profile/saved-images-album-preview.dto";
import { SavedImagesAlbum } from "src/app/models/dto/profile/saved-images-album.dto";
import { User } from "src/app/models/dto/user/user.dto";

// TODO: Use the firestore converters and the withConverter() method in the DatabaseService instead of these mappers.

// #region Event mappers
export function mapEvents(eventDocs: DocumentData): Event[] {
    const mappedEvents: Event[] = [];

    for (let i = 0; i < eventDocs.length; i++) {
        const eventDoc = eventDocs[i];

        mappedEvents.push(mapEvent(eventDoc));
    }

    return mappedEvents;
}

export function mapEvent(eventDoc: DocumentData): Event {
    const mappedEvent: Event = {
        EventId: eventDoc.id,
        CoverImageUrl: eventDoc.coverImageUrl,
        Title: eventDoc.title,
        Description: eventDoc.description,
        Creator: mapCreator(eventDoc.creator),
        Date: eventDoc.date.toDate(),
        PrivacyLevel: eventDoc.privacyLevel === 'public' ? PrivacyLevel.Public : PrivacyLevel.Private,
        Location: mapLocation(eventDoc.location),
        ImageUrls: eventDoc.imageUrls,
        AttendeesPreview: [...eventDoc.attendeesPreview.map(profilePreview => mapProfilePreview(profilePreview))],
        TotalAttendees: eventDoc.totalAttendees
    };

    return mappedEvent;
}

function mapCreator(creatorDoc: any): Creator {
    const creator: Creator = {
        CreatorId: creatorDoc.creatorId,
        CreatorType: creatorDoc.creatorType,
        DisplayName: creatorDoc.displayName,
        ImageUrl: creatorDoc.imageUrl
    };

    return creator;
}

function mapLocation(locationDoc: any): EventLocation {   
    const location: EventLocation = {
        DisplayName: locationDoc.displayName,
        Latitude: locationDoc.coordinates._lat,
        Longitude: locationDoc.coordinates._long
    };

    return location;
}

export function mapAttendees(attendeeDocs: DocumentData): ProfilePreview[] {
    const mappedAttendees: ProfilePreview[] = [];

    for (let i = 0; i < attendeeDocs.length; i++) {
        const attendeeDoc = attendeeDocs[i];

        mappedAttendees.push(mapProfilePreview(attendeeDoc));
    }

    return mappedAttendees;
}
// #endregion



// #region Group mappers
export function mapGroup(groupDoc: any): Group {
    console.log(groupDoc)
    const group: Group = {
        GroupId: groupDoc.id, 
        CoverImageUrl: groupDoc.coverImageUrl,
        Name: groupDoc.name,
        Description: groupDoc.description,
        PrivacyLevel: groupDoc.privacyLevel === 'public' ? PrivacyLevel.Public : PrivacyLevel.Private,
        Posts: [],
        Admins: [...groupDoc.admins.map(admin => mapProfilePreview(admin))],
        MembersPreview: [...groupDoc.membersPreview.map(member => mapProfilePreview(member))],
        Members: [],
        Events: []
    };

    return group
}

function mapGroupPreview(groupPreviewDoc: any): GroupPreview {
    const groupPreview: GroupPreview = {
        GroupId: groupPreviewDoc.id,
        Name: groupPreviewDoc.name,
        CoverImageUrl: groupPreviewDoc.imageUrl
    };

    return groupPreview;
}
// endregion

// #region Group Post mappers
export function mapGroupPosts(groupPostDocs: any): GroupPost[] {
    const mappedGroupPosts: GroupPost[] = [];

    for (let i = 0; i < groupPostDocs.length; i++) {
        const eventDoc = groupPostDocs[i];

        mappedGroupPosts.push(mapGroupPost(eventDoc));
    }

    return mappedGroupPosts;
}

function mapGroupPost(groupPost: any): GroupPost {
    const mappedGroupPost: GroupPost = {
        GroupPostId: groupPost.id,
        Author: mapProfilePreview(groupPost.author),
        GroupPreview: mapGroupPreview(groupPost.group),
        Content: groupPost.content,
        Date: groupPost.date.toDate(),
        ImageUrls: groupPost.imageUrls,
        Comments: []
    };

    return mappedGroupPost;
}
// endregion

function mapProfilePreview(profilePreviewDoc: any): ProfilePreview {
    const profilePreview: ProfilePreview = {
        ProfileId: profilePreviewDoc.profileId,
        FirstName: profilePreviewDoc.firstName,
        LastName: profilePreviewDoc.lastName,
        ProfilePictureUrl: profilePreviewDoc.profilePictureUrl
    };

    return profilePreview;
}


export function mapProfile(profileDoc: any): Profile {
    const profile: Profile = {
        ProfileId: profileDoc.id,
        FirstName: profileDoc.firstName,
        LastName: profileDoc.lastName,
        Username: profileDoc.username,
        ProfilePictureUrl: profileDoc.profilePictureUrl,
        HomeCountry: profileDoc.homeCountry,
        HostCountry: profileDoc.hostCountry,
        CurrentCity: profileDoc.currentCity,
        Bio: profileDoc.bio,
        Friends: profileDoc.friends,
        ImageUrls: profileDoc.imageUrls,
        SavedImageAlbumPreviews: mapSavedImagesAlbumPreviews(profileDoc.savedImagesAlbumPreviews)
    };

    return profile;
}

function mapSavedImagesAlbumPreviews(previewDocs: any[]): SavedImagesAlbumPreview[] {
    const mappedPreviews: SavedImagesAlbumPreview[] = [];

    for (let i = 0; i < previewDocs.length; i++) {
        const previewDoc = previewDocs[i];

        mappedPreviews.push({
            Id: previewDoc.id,
            CoverImageUrl: previewDoc.coverImageUrl,
            Title: previewDoc.title,
            PrivacyLevel: previewDoc.privacyLevel === 'public' ? PrivacyLevel.Public : PrivacyLevel.Private
        });
    }

    return mappedPreviews;
}

export function mapSavedImagesAlbum(albumDoc: any): SavedImagesAlbum {
    const mappedAlbum: SavedImagesAlbum = {
            Id: albumDoc.id,
            CoverImageUrl: albumDoc.coverImageUrl,
            Title: albumDoc.title,
            Description: albumDoc.description,
            PrivacyLevel: albumDoc.privacyLevel,
            ImageUrls: albumDoc.imageUrls
        };

    return mappedAlbum;
}

export function mapUser(userDoc: any): User {
    const user: User = {
        Uid: userDoc.uid,
        Username: userDoc.username,
        Dob: userDoc.dob.toDate(),
        Email: userDoc.email,
        PhoneNumber: Number.parseInt(userDoc.phoneNumber)
    };

    return user;
}
