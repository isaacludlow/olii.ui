import { Profile } from "../../profile/profile.dto";
import { GroupPost } from "./group-post.dto";

export interface Group {
    Id: number;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Posts: GroupPost[];
    Members: Profile[];
    Admins: Profile[];
}

type PrivacyLevel = 'Public' | 'Connections-Only' | 'Invite-Only';