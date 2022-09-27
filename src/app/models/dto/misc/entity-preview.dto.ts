import { EventCreatorIdType } from "./entity-preview-id-type.dto";

export interface Creator {
    CreatorId: string;
    CreatorType: EventCreatorIdType;
    DisplayName: string;
    ImageUrl: string
}