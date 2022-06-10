import { PrivacyLevel } from "../../dto/profile/SavedAlbumPrivacyLevel.do";

export interface ProfileRequestSavedAlbum {
    Id: number;
    CoverImageFile: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    ImageFile: string[];
}