import { Creator } from "src/app/models/dto/misc/entity-preview.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { ProfilePreview } from "src/app/models/dto/profile/profile-preview.dto";
import { PrivacyLevelRequest } from "../../misc/privacy-level-request.do";

export interface EventRequest {
    CoverImageUrl: string;
    Title: string;
    Description: string;
    Creator: Creator;
    Date: Date;
    PrivacyLevel: PrivacyLevelRequest;
    Location: EventLocation;
    ImagesUrls: string[];
    AttendeesPreview: ProfilePreview[];
}