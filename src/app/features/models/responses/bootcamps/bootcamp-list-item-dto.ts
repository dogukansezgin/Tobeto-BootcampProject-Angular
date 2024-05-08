import { PageResponse } from "../../../../core/models/pagination/page-response";

export interface BootcampListItemDto<T> extends PageResponse{
    items: T[]
}