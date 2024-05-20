import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { GetBootcampResponse } from "../../models/responses/bootcamps/get-bootcamp-response";
import { BootcampSearchItemResponse } from "../../models/responses/bootcamps/bootcamp-search-item-response";
import { BootcampCreateRequest } from "../../models/requests/bootcamps/bootcamp-create-request";
import { BootcampCreateResponse } from "../../models/responses/bootcamps/bootcamp-create-response";
import { BootcampUpdateRequest } from "../../models/requests/bootcamps/bootcamp-update-request";
import { BootcampUpdateResponse } from "../../models/responses/bootcamps/bootcamp-update-response";

@Injectable()
export abstract class BootcampBaseService {

    abstract getList(pageRequest: PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract getById(bootcampId: string): Observable<GetBootcampResponse>
    abstract getByName(bootcampName: string): Observable<GetBootcampResponse>
    abstract getListUnfinished(pageRequest:PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract getListFinished(pageRequest:PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>>
    abstract searchAllBootcamps(): Observable<BootcampListItemDto<BootcampSearchItemResponse>>
    abstract createBootcamp(bootcampCreateRequest: BootcampCreateRequest) :  Observable<BootcampCreateResponse>
    abstract updateBootcamp(bootcampUpdateRequest: BootcampUpdateRequest) :  Observable<BootcampUpdateResponse>

}