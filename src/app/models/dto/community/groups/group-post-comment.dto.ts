import { ProfilePreview } from "../../profile/profile-preview.dto";

export interface GroupPostComment {
    CommentId: string;
    Author: ProfilePreview;
    Content: string;
    Date: Date;
}