import { EntityPreviewIdType } from "./entity-preview-id-type.dto";

export interface EntityPreview {
    Id: number;
    IdType: EntityPreviewIdType;
    DisplayName: string;
    ImageUrl: string
}