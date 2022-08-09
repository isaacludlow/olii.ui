export interface CreatePostRequest {
    Group: number;
    Author: number;
    Content: string;
    Date: Date;
    ImagesData: string[];
}