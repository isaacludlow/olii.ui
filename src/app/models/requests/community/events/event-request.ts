import { EventPrivacyLevel } from "src/app/models/dto/community/events/event-privacy-level.dto";
import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";

export interface EventRequest {
    CoverImage: string;
    Title: string;
    Description: string;
    CreatorId: number;
    CreatorType: EventCreatorIdType;
    Date: Date;
    PrivacyLevel: EventPrivacyLevel;
    Location: EventLocation
}