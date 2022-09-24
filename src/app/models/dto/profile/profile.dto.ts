import { ConnectedSocial } from "./connected-social.dto";
import { SavedImagesAlbumPreview } from "./saved-images-album-preview.dto";

export interface Profile {
    /** Id of the profile. */
    ProfileId: number;
    /** The user's first name. */
    FirstName: string;
    /** The user's last name. */
    LastName: string;
    /** The username for the user. */
    Username: string;
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
    // ConnectedSocials: ConnectedSocial[]; // Commented out for now. Will add feature later.
    /** Number of friends the user has. */
    Friends: number;
    /** Profile images on the user's profile to show who they are. */
    ImageUrls: string[];
    /** Images from throughout the app that are saved to albums in the user profile. */
    SavedImageAlbumPreviews: SavedImagesAlbumPreview[];
}
