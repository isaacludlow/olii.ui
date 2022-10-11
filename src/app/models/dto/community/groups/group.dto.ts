import { PrivacyLevel } from "../../misc/privacy-level.dto";
import { ProfilePreview } from "../../profile/profile-preview.dto";
import { Event } from "../events/event.dto";
import { GroupPost } from "./group-post.dto";

export interface Group {
    GroupId: string;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Posts: GroupPost[]; // Get the members only when the user navigates to the members page for a group.
    Admins: ProfilePreview[]; // Get the admins with the initial call to get a group.
    MemberPreviews: ProfilePreview[]; // Shows the first 5 profiles on the group details page in the members section.
    Members: ProfilePreview[]; // Get the members only when the user navigates to the members page for a group.
    Events: Event[]; // Events under a given group.
}