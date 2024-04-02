import { PageResponse } from "../../../../core/models/pagination/page-response";
import { GetBootcampListResponse } from "./get-bootcamp-list-response";

export interface BootcampListItemDto extends PageResponse{
    items: GetBootcampListResponse[]
}