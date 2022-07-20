import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export interface CreatePostRequest {
    Group: number;
    Author: number;
    Content: string;
    Date: Date;
    ImagesData: string[];
}