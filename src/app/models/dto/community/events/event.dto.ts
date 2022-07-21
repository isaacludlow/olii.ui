import { EntityPreview } from "../../misc/entity-preview.dto";
import { EventLocation } from "../../misc/event-location.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";
import { EventPrivacyLevel } from "./event-privacy-level.dto";

export interface Event {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: EntityPreview;
    Date: Date;
    PrivacyLevel: EventPrivacyLevel;
    Location: EventLocation;
    ImageUrls: string[];
    Attendees: PartialProfile[];
}
