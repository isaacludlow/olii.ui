import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export interface GroupPostCommentRequest {
    OriginGroup: number;
    ParentId: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
}