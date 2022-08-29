import { PrivacyLevelRequest } from "../../requests/misc/privacy-level-request.do";

export interface SavedAlbum {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevelRequest;
    ImageUrls: string[];
}
