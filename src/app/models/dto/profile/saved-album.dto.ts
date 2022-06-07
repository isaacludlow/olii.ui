export interface SavedAlbum {
    Id: number;
    CoverImageUrl: string;
    Title: string;
    Description: string;
    PrivacyLevel: PrivacyLevel;
    Images: string[];
}

type PrivacyLevel = 'Public' | 'Private';