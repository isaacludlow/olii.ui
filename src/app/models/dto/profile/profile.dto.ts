import { ProfileImage } from "./profile-image.dto";

export interface Profile {
    ProfileId: number;
    UserId: number;
    NumberOfConnections: number;
    Bio: string;
    HomeCountry: string;
    HostCountry: string;
    HostCity: string;
    ProfilePictureUrl: string;
    ProfileImages: ProfileImage[];
}
