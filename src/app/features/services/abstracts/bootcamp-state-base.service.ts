import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampStateGetListResponse } from "../../models/responses/bootcamp-states/bootcamp-state-get-list-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { BootcampStateCreateRequest } from "../../models/requests/bootcampStates/bootcamp-state-create-request";
import { BootcampStateDeleteRangeRequest } from "../../models/requests/bootcampStates/bootcamp-state-delete-range-request";
import { BootcampStateDeleteRequest } from "../../models/requests/bootcampStates/bootcamp-state-delete-request";
import { BootcampStateRestoreRangeRequest } from "../../models/requests/bootcampStates/bootcamp-state-restore-range-request";
import { BootcampStateRestoreRequest } from "../../models/requests/bootcampStates/bootcamp-state-restore-request";
import { BootcampStateUpdateRequest } from "../../models/requests/bootcampStates/bootcamp-state-update-request";
import { BootcampStateCreateResponse } from "../../models/responses/bootcamp-states/bootcamp-state-create-response";
import { BootcampStateDeleteRangeResponse } from "../../models/responses/bootcamp-states/bootcamp-state-delete-range-response";
import { BootcampStateDeleteResponse } from "../../models/responses/bootcamp-states/bootcamp-state-delete-response";
import { BootcampStateGetListDeletedResponse } from "../../models/responses/bootcamp-states/bootcamp-state-get-list-deleted-response";
import { BootcampStateRestoreRangeResponse } from "../../models/responses/bootcamp-states/bootcamp-state-restore-range-response";
import { BootcampStateRestoreResponse } from "../../models/responses/bootcamp-states/bootcamp-state-restore-response";
import { BootcampStateUpdateResponse } from "../../models/responses/bootcamp-states/bootcamp-state-update-response";

@Injectable()
export abstract class BootcampStateBaseService {

    abstract getList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampStateGetListResponse>>
    abstract getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BootcampStateGetListDeletedResponse>>
    abstract createBootcampState(bootcampstateCreateRequest: BootcampStateCreateRequest): Observable<BootcampStateCreateResponse>
    abstract updateBootcampState(bootcampstateUpdateRequest: BootcampStateUpdateRequest): Observable<BootcampStateUpdateResponse>
    abstract deleteBootcampState(bootcampstateDeleteRequest: BootcampStateDeleteRequest): Observable<BootcampStateDeleteResponse>
    abstract deleteRangeBootcampState(bootcampstateDeleteRangeRequest: BootcampStateDeleteRangeRequest): Observable<BootcampStateDeleteRangeResponse>
    abstract restoreBootcampState(bootcampstateRestoreRequest: BootcampStateRestoreRequest): Observable<BootcampStateRestoreResponse>
    abstract restoreRangeBootcampState(bootcampstateRestoreRangeRequest: BootcampStateRestoreRangeRequest): Observable<BootcampStateRestoreRangeResponse>

}