import { PrivacyLevel } from "../misc/privacy-level.do";

export interface SavedAlbum {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    ImageUrls: string[];
}
