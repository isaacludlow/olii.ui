import { PrivacyLevel } from "src/app/models/dto/community/groups/group-privacy-level.do";

export interface UpdateGroupRequest {
    Id: number;
    CoverImageData: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
}