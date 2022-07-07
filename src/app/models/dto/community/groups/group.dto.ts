import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPost } from "./group-post.dto";

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

type PrivacyLevel = 'Public' | 'Friends-Only' | 'Invite-Only';