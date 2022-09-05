import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPostComment } from "./group-post-comment.dto";

export interface GroupPost {
    GroupPostId: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
    ImageUrls: string[];
    
    // These will come from a separate call to the database than the above properties.
    Comments: GroupPostComment[];
}