import { PrivacyLevel } from "src/app/models/dto/community/groups/group-privacy-level.do";
import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export interface CreateGroupRequest {
    CoverImageData: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Admin: number,
}