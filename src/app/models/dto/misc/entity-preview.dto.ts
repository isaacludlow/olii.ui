import { EventCreatorIdType } from "./entity-preview-id-type.dto";

export interface Creator {
    CreatorId: number;
    CreatorType: EventCreatorIdType;
    DisplayName: string;
    ImageUrl: string
}