import { EventCreatorType } from "./event-creator-type.dto";
import { Invitation } from "./invitation.dto";

export interface Event {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    CreatorType: EventCreatorType;
    CreatorId: number;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: string;
    ImageUrls: string[]
    Invitations: Invitation[]
}

// Connections-Only is valid for the creator type of user not group.
type PrivacyLevel = 'Public' | 'Group' | 'Connections-Only' | 'Invite-Only';
