import { EventCreatorIdType } from "src/app/models/dto/misc/entity-preview-id-type.dto";
import { EventLocation } from "src/app/models/dto/misc/event-location.dto";
import { PrivacyLevel } from "src/app/models/dto/misc/privacy-level.do";

export interface EventRequest {
    CoverImageData: string;
    Title: string;
    Description: string;
    CreatorId: number;
    CreatorType: EventCreatorIdType;
    Date: Date;
    PrivacyLevel: PrivacyLevel;
    Location: EventLocation;
    Images: string[];
}