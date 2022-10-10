import { PrivacyLevelRequest } from "src/app/models/requests/misc/privacy-level-request.do";

export interface GroupRequest {
    GroupId: string;
    CoverImageData: string;
    Name: string;
    Description: string;
    PrivacyLevelParamId: PrivacyLevelRequest;
}