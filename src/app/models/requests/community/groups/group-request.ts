import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

export interface GroupRequest {
    GroupId: string;
    CoverImageUrl: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Admins: ProfilePreview[];
}