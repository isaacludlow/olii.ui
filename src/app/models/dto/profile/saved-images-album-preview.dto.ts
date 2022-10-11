import { PrivacyLevel } from "../misc/privacy-level.dto";

export interface SavedImagesAlbumPreview {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    PrivacyLevel: PrivacyLevel;
}
