import { EntityPreview } from "../../misc/entity-preview.dto";
import { EventLocation } from "../../misc/event-location.dto";
import { PrivacyLevel } from "../../misc/privacy-level.do";
import { PartialProfile } from "../../profile/partial-profile.dto";

export interface Event {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: EntityPreview;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: EventLocation;
    ImageUrls: string[];
    Attendees: PartialProfile[];
}
