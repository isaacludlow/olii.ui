import { PrivacyLevelRequest } from "src/app/models/requests/misc/privacy-level-request.do";

export interface GroupRequest {
    Id: number;
    CoverImageData: string;
    Name: string;
    Description: string;
    PrivacyLevel: PrivacyLevelRequest;
    Admin: number,
}