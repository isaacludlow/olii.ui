export interface SavedImagesAlbum {
    Id: number;
    CoverImage: string;
    Title: string;
    Description: string;
    Visibility: VisibilityType;
    Images: string[];
}

type VisibilityType = 'Public' | 'Private';