import { DocumentData } from "@angular/fire/firestore";
import { Event } from "src/app/models/dto/community/events/event.dto";
import { Creator } from "src/app/models/dto/misc/entity-preview.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { Profile } from "src/app/models/dto/profile/profile.dto";
import { SavedImagesAlbumPreview } from "src/app/models/dto/profile/saved-images-album-preview.dto";
import { User } from "src/app/models/dto/user/user.dto";

export function mapEvents(eventDocs: DocumentData): Event[] {
    const mappedEvents: Event[] = [];

    for (let i = 0; i < eventDocs.length; i++) {
        const eventDoc = eventDocs[i];

        mappedEvents.push({
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
        });
    }

    return mappedEvents;
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

function mapProfilePreview(profilePreviewDoc: any): ProfilePreview {
    const profilePreview: ProfilePreview = {
        ProfileId: profilePreviewDoc.id,
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
    console.log(profile)

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
