import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampGetListResponse } from "../../models/responses/bootcamps/bootcamp-get-list-response";
import { BootcampSearchItemResponse } from "../../models/responses/bootcamps/bootcamp-search-item-response";
import { BootcampCreateRequest } from "../../models/requests/bootcamps/bootcamp-create-request";
import { BootcampCreateResponse } from "../../models/responses/bootcamps/bootcamp-create-response";
import { BootcampUpdateRequest } from "../../models/requests/bootcamps/bootcamp-update-request";
import { BootcampUpdateResponse } from "../../models/responses/bootcamps/bootcamp-update-response";
import { BootcampDeleteRequest } from "../../models/requests/bootcamps/bootcamp-delete-request";
import { BootcampDeleteResponse } from "../../models/responses/bootcamps/bootcamp-delete-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { BootcampGetListDeletedResponse } from "../../models/responses/bootcamps/bootcamp-get-list-deleted-response";
import { BootcampRestoreRequest } from "../../models/requests/bootcamps/bootcamp-restore-request";
import { BootcampRestoreResponse } from "../../models/responses/bootcamps/bootcamp-restore-response";
import { BootcampDeleteRangeResponse } from "../../models/responses/bootcamps/bootcamp-delete-range-response";
import { BootcampRestoreRangeResponse } from "../../models/responses/bootcamps/bootcamp-restore-range-response";
import { BootcampDeleteRangeRequest } from "../../models/requests/bootcamps/bootcamp-delete-range-request";
import { BootcampRestoreRangeRequest } from "../../models/requests/bootcamps/bootcamp-restore-range-request";
import { BootcampGetBasicInfoResponse } from "../../models/responses/bootcamps/bootcamp-get-basic-info-response";
import { BootcampGetListImageResponse } from "../../models/responses/bootcamps/bootcamp-get-list-image-response";

@Injectable()
export abstract class BootcampBaseService {

    abstract getList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListResponse>>
    abstract getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListDeletedResponse>>
    abstract getBootcampsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetBasicInfoResponse>>
    abstract getById(bootcampId: string): Observable<BootcampGetListResponse>
    abstract getByName(bootcampName: string): Observable<BootcampGetListResponse>

    abstract getListUnfinished(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListImageResponse>>
    abstract getListFinished(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListImageResponse>>
    abstract searchAllBootcamps(): Observable<ListItemsDto<BootcampSearchItemResponse>>

    abstract createBootcamp(bootcampCreateRequest: BootcampCreateRequest): Observable<BootcampCreateResponse>
    abstract updateBootcamp(bootcampUpdateRequest: BootcampUpdateRequest): Observable<BootcampUpdateResponse>
    abstract deleteBootcamp(bootcampDeleteRequest: BootcampDeleteRequest): Observable<BootcampDeleteResponse>
    abstract deleteRangeBootcamp(bootcampDeleteRangeRequest: BootcampDeleteRangeRequest): Observable<BootcampDeleteRangeResponse>
    abstract restoreBootcamp(bootcampRestoreRequest: BootcampRestoreRequest): Observable<BootcampRestoreResponse>
    abstract restoreRangeBootcamp(bootcampRestoreRangeRequest: BootcampRestoreRangeRequest): Observable<BootcampRestoreRangeResponse>

}