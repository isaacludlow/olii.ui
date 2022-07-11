import { PartialProfile } from "src/app/models/dto/profile/partial-profile.dto";

export interface CreatePostRequest {
    Group: number;
    Author: PartialProfile;
    Content: string;
    Date: Date;
    ImagesData: string[];
}