import { GroupPostComment } from "./group-post-comment.dto";

export interface GroupPost {
    Id: number;
    AuthorUserId: number;
    Content: string;
    Date: Date;
    ImageUrls: string[];
    Comments: GroupPostComment[];
}