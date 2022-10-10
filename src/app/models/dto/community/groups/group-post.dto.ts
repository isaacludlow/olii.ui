import { ProfilePreview } from "../../profile/profile-preview.dto";
import { GroupPostComment } from "./group-post-comment.dto";
import { GroupPreview } from "./group-preview.dto";

export interface GroupPost {
    GroupPostId: number;
    Author: ProfilePreview;
    GroupPreview: GroupPreview;
    Content: string;
    Date: Date;
    ImageUrls: string[];
    
    // These will come from a separate call to the database than the above properties.
    Comments: GroupPostComment[];
}