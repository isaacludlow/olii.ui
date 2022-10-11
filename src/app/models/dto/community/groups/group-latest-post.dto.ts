import { GroupPost } from "./group-post.dto";

export interface LatestGroupPost {
    GroupId: number,
    GroupName: string,
    GroupCoverImageUrl: string,
    GroupPost: GroupPost
}