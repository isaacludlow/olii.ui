import { EventCreatorIdType } from "./entity-preview-id-type.dto";

export interface EntityPreview {
    Id: number;
    IdType: EventCreatorIdType;
    DisplayName: string;
    ImageUrl: string
}