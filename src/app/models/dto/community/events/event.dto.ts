import { EntityPreview } from "../../misc/entity-preview.dto";
import { EventLocation } from "../../misc/event-location.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";
import { PrivacyLevel } from "../../misc/privacy-level.dto";

export interface Event {
    EventId: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: EntityPreview;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: EventLocation;
    ImageUrls: string[];
    AttendeeProfiles: PartialProfile[];
}
