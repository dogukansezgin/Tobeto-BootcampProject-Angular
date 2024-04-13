import { PageResponse } from "../../../../core/models/pagination/page-response";
import { AppliedBootcampResponse } from "./applied-bootcamp-response";

export interface ApplicationListItemDto extends PageResponse {
    items: AppliedBootcampResponse[]
}