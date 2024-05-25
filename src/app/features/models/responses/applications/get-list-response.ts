import { PageResponse } from "../../../../core/models/pagination/page-response";

export interface GetListResponse<T> extends PageResponse{
    items:T[];
}