import { Creator } from "../../misc/entity-preview.dto";
import { EventLocation } from "../../misc/event-location.dto";
import { PrivacyLevel } from "../../misc/privacy-level.dto";
import { ProfilePreview } from "../../profile/profile-preview.dto";

export interface Event {
    EventId: string;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: Creator;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: EventLocation;
    ImageUrls: string[];
    AttendeesPreview: ProfilePreview[];
    TotalAttendees: number;
}
