import { ProfilePreview } from "../../profile/profile-preview.dto";

export interface GroupPostComment {
    CommentId: number;
    Author: ProfilePreview;
    Content: string;
    Date: Date;
}