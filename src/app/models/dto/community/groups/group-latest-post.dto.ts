import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPost } from "./group-post.dto";

export interface GroupPostLatest {
    GroupName: string,
    GroupImageUrl: string,
    GroupPost: GroupPost
}