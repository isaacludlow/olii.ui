import { PartialProfile } from "../profile/partial-profile.dto";
import { InvitationStatus } from "./invitation-status.dto";

export interface Invitation {
    Id: number;
    Status: InvitationStatus;
    Recipient: PartialProfile;
}
