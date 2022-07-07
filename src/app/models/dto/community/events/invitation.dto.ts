import { PartialProfile } from "../../profile/partial-profile.dto";

export interface Invitation {
    Id: number;
    Status: InvitationStatus;
    Recipient: PartialProfile;
}

type InvitationStatus = 'Coming' | 'Tentative' | 'Declined';