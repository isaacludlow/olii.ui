import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";
import { Creator } from "src/app/models/dto/misc/entity-preview.dto";

import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";

import { PrivacyLevelRequest } from "src/app/models/requests/misc/privacy-level-request.do";

export interface EventData {
    CoverImageData: string;
    Title: string;
    Description: string;
    Creator: Creator;
    Date: Date;
    PrivacyLevel: PrivacyLevelRequest;
    Location: EventLocation;
    ImagesData: string[];
    AttendeesPreview: ProfilePreview[];
}