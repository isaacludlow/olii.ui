import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPostComment } from "./group-post-comment.dto";

export interface GroupPost {
    Id: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
    ImageUrls: string[];
    Comments: GroupPostComment[];
}