import { ProfileImage } from "./profile-image.dto";
import { SavedImagesAlbum } from "./saved-images-album.dto";

export interface Profile {
    /** Id of the profile. */
    ProfileId: number;
    /** Id of the user. */
    UserId: number;
    /** Number of connections the user has. */
    NumberOfConnections: number;
    /** Bio for the profile. */
    Bio: string;
    /** Country user is from. */
    HomeCountry: string;
    /** Country user is studying abroad in. */
    HostCountry: string;
    /** City user is studying abroad in. */
    HostCity: string;
    /** Profile picture url of the user. Shown in thumbnails on events, groups, etc.  */
    ProfilePictureUrl: string;
    /** Profile images on the user's profile to show who they are. */
    ProfileImages: ProfileImage[];
    /** Images from throughout the app that are saved to albums in the user profile. */
    SavedImagesAlbums: SavedImagesAlbum[];
}
