import { PageResponse } from "../../../../core/models/pagination/page-response";
import { GetBootcampResponse } from "./get-bootcamp-response";

export interface BootcampListItemDto extends PageResponse{
    items: GetBootcampResponse[]
}