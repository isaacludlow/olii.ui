import { PrivacyLevelRequest } from "../misc/privacy-level-request.do";

export interface ProfileRequestSavedAlbum {
    Id: number;
    CoverImageFile: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevelRequest;
    ImageFiles: string[];
}