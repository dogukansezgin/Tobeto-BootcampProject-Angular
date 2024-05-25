import { Injectable } from "@angular/core";
import { ApplicationStateBaseService } from "../abstracts/application-state-base.service";
import { Observable, map } from "rxjs";
import { ApplicationStateGetByNameResponse } from "../../models/responses/application-states/application-state-get-by-name-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
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

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService extends ApplicationStateBaseService {

    private readonly apiUrl_GetByName: string = environment.apiUrl + environment.endpoints.applicationStates.getByName;
    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.applicationStates.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.applicationStates.getListDeleted;
    private readonly apiUrl_CreateApplicationState = environment.apiUrl + environment.endpoints.applicationStates.createApplicationState;
    private readonly apiUrl_UpdateApplicationState = environment.apiUrl + environment.endpoints.applicationStates.updateApplicationState;
    private readonly apiUrl_DeleteApplicationState = environment.apiUrl + environment.endpoints.applicationStates.deleteApplicationState;
    private readonly apiUrl_DeleteRangeApplicationState = environment.apiUrl + environment.endpoints.applicationStates.deleteRangeApplicationState;
    private readonly apiUrl_RestoreApplicationState = environment.apiUrl + environment.endpoints.applicationStates.restoreApplicationState;
    private readonly apiUrl_RestoreRangeApplicationState = environment.apiUrl + environment.endpoints.applicationStates.restoreRangeApplicationState;

    constructor(private httpClient: HttpClient) { super(); }

    override getByName(name: string): Observable<ApplicationStateGetByNameResponse> {
        return this.httpClient.get<ApplicationStateGetByNameResponse>(this.apiUrl_GetByName + name)
    }
    
    override getList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationStateGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicationStateGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicationStateGetListResponse> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            )
    }
    override getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationStateGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicationStateGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicationStateGetListDeletedResponse> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            )
    }

    override createApplicationState(applicationStateCreateRequest: ApplicationStateCreateRequest): Observable<ApplicationStateCreateResponse> {
        return this.httpClient.post<ApplicationStateCreateResponse>(this.apiUrl_CreateApplicationState, applicationStateCreateRequest)
    }
    override updateApplicationState(applicationStateUpdateRequest: ApplicationStateUpdateRequest): Observable<ApplicationStateUpdateResponse> {
        return this.httpClient.put<ApplicationStateUpdateResponse>(this.apiUrl_UpdateApplicationState, applicationStateUpdateRequest)
    }
    override deleteApplicationState(applicationStateDeleteRequest: ApplicationStateDeleteRequest): Observable<ApplicationStateDeleteResponse> {
        return this.httpClient.post<ApplicationStateDeleteResponse>(this.apiUrl_DeleteApplicationState, applicationStateDeleteRequest)
    }
    override deleteRangeApplicationState(applicationStateDeleteRangeRequest: ApplicationStateDeleteRangeRequest): Observable<ApplicationStateDeleteRangeResponse> {
        return this.httpClient.post<ApplicationStateDeleteRangeResponse>(this.apiUrl_DeleteRangeApplicationState, applicationStateDeleteRangeRequest)
    }
    override restoreApplicationState(applicationStateRestoreRequest: ApplicationStateRestoreRequest): Observable<ApplicationStateRestoreResponse> {
        return this.httpClient.post<ApplicationStateRestoreResponse>(this.apiUrl_RestoreApplicationState, applicationStateRestoreRequest)
    }
    override restoreRangeApplicationState(applicationStateRestoreRangeRequest: ApplicationStateRestoreRangeRequest): Observable<ApplicationStateRestoreRangeResponse> {
        return this.httpClient.post<ApplicationStateRestoreRangeResponse>(this.apiUrl_RestoreRangeApplicationState, applicationStateRestoreRangeRequest)
    }

}