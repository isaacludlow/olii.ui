import { Creator } from "../../misc/entity-preview.dto";
import { EventLocation } from "../../misc/event-location.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";
import { PrivacyLevel } from "../../misc/privacy-level.dto";

export interface Event {
    EventId: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: Creator;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: EventLocation;
    ImageUrls: string[];
    AttendeesPreview: PartialProfile[];
}
