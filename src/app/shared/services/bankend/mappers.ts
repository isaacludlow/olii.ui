import { DocumentData } from "@angular/fire/firestore";
import { Event } from "src/app/models/dto/community/events/event.dto";
import { Creator } from "src/app/models/dto/misc/entity-preview.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.dto";

export function mapEvents(eventDocuments: DocumentData): Event[] {
    const mappedEvents: Event[] = [];
    console.log(eventDocuments)

    for (let i = 0; i < eventDocuments.length; i++) {
        const eventDoc = eventDocuments[i];

        mappedEvents.push({
            EventId: eventDoc.id,
            CoverImageUrl: eventDoc.coverImageUrl,
            Title: eventDoc.title,
            Description: eventDoc.description,
            Creator: mapCreator(eventDoc.creator),
            Date: eventDoc.date.toDate(),
            PrivacyLevel: eventDoc.privacyLevel === 'public' ? PrivacyLevel.Public : PrivacyLevel.Public,
            Location: mapLocation(eventDoc.location),
            ImageUrls: eventDoc.imageUrls,
            AttendeesPreview: eventDoc.attendeesPreview
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