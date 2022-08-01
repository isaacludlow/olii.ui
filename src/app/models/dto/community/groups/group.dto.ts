import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPost } from "./group-post.dto";
import { PrivacyLevel } from "../../misc/privacy-level.do";

export interface Group {
    Id: number;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Posts: GroupPost[];
    Admins: PartialProfile[];
    Members: PartialProfile[];
}