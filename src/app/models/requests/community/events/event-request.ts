import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";

// Will use this in the future. Had to put the location data directly on the eventRequest bc of how the api was written.
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";

import { PrivacyLevelRequest } from "src/app/models/requests/misc/privacy-level-request.do";

export interface EventRequest {
    CoverImageData: string;
    Title: string;
    Description: string;
    CreatorId: number;
    CreatorTypeParamId: EventCreatorIdType;
    Date: Date;
    PrivacyLevelParamId: PrivacyLevelRequest;
    LocationDisplayName: string;
    Latitude: number;
    Longitude: number;
    Images: string[];
    AttendeeProfileIds: [];
}