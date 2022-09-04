import { PrivacyLevel } from "../../misc/privacy-level.dto"

export interface PartialGroup {
    GroupId: number;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
}