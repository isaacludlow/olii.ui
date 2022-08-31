import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPostComment } from "./group-post-comment.dto";

export interface GroupPost {
    GroupPostId: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
    ImageUrls: string[];
    
    // Not sure if these should be here or if we'll just make a separate call to get them as we need them.
    Comments: GroupPostComment[];
}