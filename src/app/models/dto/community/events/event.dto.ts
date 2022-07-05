import { EntityPreview } from "../../misc/entity-preview.dto";
import { Location } from "../../misc/location.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";

export interface Event {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: EntityPreview;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: Location;
    ImageUrls: string[];
    Attendees: PartialProfile[];
}

// Friends-Only is valid for the creator type of user not group.
type PrivacyLevel = 'Public' | 'Group' | 'Friends-Only' | 'Invite-Only';
