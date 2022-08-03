import { PrivacyLevel } from "../../dto/misc/privacy-level.do";

export interface ProfileRequestSavedAlbum {
    Id: number;
    CoverImageFile: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    ImageFiles: string[];
}