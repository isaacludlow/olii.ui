import { Location } from "../../misc/location.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";
import { EventCreatorType } from "./event-creator-type.dto";

export interface Event {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    CreatorType: EventCreatorType;
    CreatorId: number;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: Location;
    ImageUrls: string[];
    Attendees: PartialProfile[];
}

// Friends-Only is valid for the creator type of user not group.
type PrivacyLevel = 'Public' | 'Group' | 'Friends-Only' | 'Invite-Only';
