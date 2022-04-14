export interface SavedImagesAlbum {
    Title: string;
    Description: string;
    Visibility: VisibilityType;
    Images: string[];
}

type VisibilityType = 'Public' | 'Private';