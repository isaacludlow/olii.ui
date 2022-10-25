import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";
import { Creator } from "src/app/models/dto/misc/entity-preview.dto";

// Will use this in the future. Had to put the location data directly on the eventRequest bc of how the api was written.
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

import { PrivacyLevelRequest } from "src/app/models/requests/misc/privacy-level-request.do";

export interface EventRequest {
    CoverImageData: string;
    Title: string;
    Description: string;
    Creator: Creator;
    Date: Date;
    PrivacyLevel: PrivacyLevelRequest;
    Location: EventLocation;
    Images: string[];
    AttendeesPreview: ProfilePreview[];
}