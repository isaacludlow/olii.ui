import { PrivacyLevel } from "../../misc/privacy-level.dto";
import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPost } from "./group-post.dto";

export interface Group {
    GroupId: number;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Posts?: GroupPost[]; // Get the members only when the user navigates to the members page for a group.
    Admins?: PartialProfile[]; // Get the admins with the initial call to get a group.
    Members?: PartialProfile[]; // Get the members only when the user navigates to the members page for a group.
}