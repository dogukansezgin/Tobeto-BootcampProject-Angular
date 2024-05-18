import { PageResponse } from "./page-response";

export interface ListItemsDto<T> extends PageResponse{
    items: T[]
}