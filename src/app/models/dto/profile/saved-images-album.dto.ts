import { PrivacyLevelRequest } from "../../requests/misc/privacy-level-request.do";

export interface SavedImagesAlbum {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevelRequest;
    ImageUrls: string[];
}
