import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

export interface GroupPostCommentRequest {
    OriginGroup: number;
    ParentId: number;
    Author: ProfilePreview;
    Content: string;
    Date: Date;
}