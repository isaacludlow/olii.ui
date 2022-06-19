import { PartialProfile } from "../../profile/partial-profile.dto";

export interface GroupPostComment {
    Id: number;
    ParentId: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
}