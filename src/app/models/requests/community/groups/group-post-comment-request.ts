import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

export interface GroupPostCommentRequest {
    CommentId: number
    Author: ProfilePreview;
    Content: string;
    Date: Date;
}