import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApplicationStateGetByNameResponse } from "../../models/responses/application-states/application-state-get-by-name-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationStateCreateRequest } from "../../models/requests/applicationStates/application-state-create-request";
import { ApplicationStateDeleteRangeRequest } from "../../models/requests/applicationStates/application-state-delete-range-request";
import { ApplicationStateDeleteRequest } from "../../models/requests/applicationStates/application-state-delete-request";
import { ApplicationStateRestoreRangeRequest } from "../../models/requests/applicationStates/application-state-restore-range-request";
import { ApplicationStateRestoreRequest } from "../../models/requests/applicationStates/application-state-restore-request";
import { ApplicationStateUpdateRequest } from "../../models/requests/applicationStates/application-state-update-request";
import { ApplicationStateCreateResponse } from "../../models/responses/application-states/application-state-create-response";
import { ApplicationStateDeleteRangeResponse } from "../../models/responses/application-states/application-state-delete-range-response";
import { ApplicationStateDeleteResponse } from "../../models/responses/application-states/application-state-delete-response";
import { ApplicationStateGetListDeletedResponse } from "../../models/responses/application-states/application-state-get-list-deleted-response";
import { ApplicationStateGetListResponse } from "../../models/responses/application-states/application-state-get-list-response";
import { ApplicationStateRestoreRangeResponse } from "../../models/responses/application-states/application-state-restore-range-response";
import { ApplicationStateRestoreResponse } from "../../models/responses/application-states/application-state-restore-response";
import { ApplicationStateUpdateResponse } from "../../models/responses/application-states/application-state-update-response";

@Injectable()
export abstract class ApplicationStateBaseService {

    abstract getByName(name: string) : Observable<ApplicationStateGetByNameResponse>
    abstract getList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationStateGetListResponse>>
    abstract getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationStateGetListDeletedResponse>>
    abstract createApplicationState(applicationstateCreateRequest: ApplicationStateCreateRequest): Observable<ApplicationStateCreateResponse>
    abstract updateApplicationState(applicationstateUpdateRequest: ApplicationStateUpdateRequest): Observable<ApplicationStateUpdateResponse>
    abstract deleteApplicationState(applicationstateDeleteRequest: ApplicationStateDeleteRequest): Observable<ApplicationStateDeleteResponse>
    abstract deleteRangeApplicationState(applicationstateDeleteRangeRequest: ApplicationStateDeleteRangeRequest): Observable<ApplicationStateDeleteRangeResponse>
    abstract restoreApplicationState(applicationstateRestoreRequest: ApplicationStateRestoreRequest): Observable<ApplicationStateRestoreResponse>
    abstract restoreRangeApplicationState(applicationstateRestoreRangeRequest: ApplicationStateRestoreRangeRequest): Observable<ApplicationStateRestoreRangeResponse>
    
}