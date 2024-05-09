import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { GetBootcampResponse } from "../../models/responses/bootcamps/get-bootcamp-response";
import { BootcampSearchItemResponse } from "../../models/responses/bootcamps/bootcamp-search-item-response";

@Injectable()
export abstract class BootcampBaseService {

    abstract getList(pageRequest: PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract getById(bootcampId: string): Observable<GetBootcampResponse>
    abstract getListUnfinished(): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract getListFinished(pageRequest:PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract searchAllBootcamps(): Observable<BootcampListItemDto<BootcampSearchItemResponse>>
}