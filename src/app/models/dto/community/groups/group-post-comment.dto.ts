import { ProfilePreview } from "../../profile/profile-preview.dto";

export interface GroupPostComment {
    Id: number;
    ParentId: number;
    Author: ProfilePreview;
    Content: string;
    Date: Date;
}