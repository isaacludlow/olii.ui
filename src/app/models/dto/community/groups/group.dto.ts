import { PartialProfile } from "../../profile/partial-profile.dto";
import { GroupPost } from "./group-post.dto";
import { PrivacyLevelRequest } from "../../../requests/misc/privacy-level-request.do";

export interface Group {
    Id: number;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevelRequest;
    Posts: GroupPost[];
    Admins: PartialProfile[];
    Members: PartialProfile[];
}