import { SavedAlbum as SavedAlbum } from "./saved-album.dto";

export interface Profile {
    /** Id of the profile. */
    ProfileId: number;
    /** The user's first name. */
    FirstName: string;
    /** The user's last name. */
    LastName: string;
    /** Profile picture url of the user. Shown in thumbnails on events, groups, etc.  */
    ProfilePictureUrl: string;
    /** Country user is from. */
    HomeCountry: string;
    /** Country user is studying abroad in. */
    HostCountry: string;
    /** City user is studying abroad in. */
    CurrentCity: string;
    /** Bio for the profile. */
    Bio: string;
    /** Links to social apps. */
    ConnectedSocials: ConnectedSocial[];
    /** Number of connections the user has. */
    Connections: number;
    /** Profile images on the user's profile to show who they are. */
    ImageUrls: string[];
    /** Images from throughout the app that are saved to albums in the user profile. */
    SavedAlbums: SavedAlbum[];
}
