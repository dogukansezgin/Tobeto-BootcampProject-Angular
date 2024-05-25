import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampStateGetListResponse } from "../../models/responses/bootcamp-states/bootcamp-state-get-list-response";
import { BootcampStateBaseService } from "../abstracts/bootcamp-state-base.service";
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

@Injectable({
    providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService {
    

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.bootcampStates.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.bootcampStates.getListDeleted;
    private readonly apiUrl_CreateBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.createBootcampState;
    private readonly apiUrl_UpdateBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.updateBootcampState;
    private readonly apiUrl_DeleteBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.deleteBootcampState;
    private readonly apiUrl_DeleteRangeBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.deleteRangeBootcampState;
    private readonly apiUrl_RestoreBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.restoreBootcampState;
    private readonly apiUrl_RestoreRangeBootcampState = environment.apiUrl + environment.endpoints.bootcampStates.restoreRangeBootcampState;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampStateGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampStateGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampStateGetListResponse> = {
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
    override getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BootcampStateGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampStateGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampStateGetListDeletedResponse> = {
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

    override createBootcampState(bootcampStateCreateRequest: BootcampStateCreateRequest): Observable<BootcampStateCreateResponse> {
        return this.httpClient.post<BootcampStateCreateResponse>(this.apiUrl_CreateBootcampState, bootcampStateCreateRequest)
    }
    override updateBootcampState(bootcampStateUpdateRequest: BootcampStateUpdateRequest): Observable<BootcampStateUpdateResponse> {
        return this.httpClient.put<BootcampStateUpdateResponse>(this.apiUrl_UpdateBootcampState, bootcampStateUpdateRequest)
    }
    override deleteBootcampState(bootcampStateDeleteRequest: BootcampStateDeleteRequest): Observable<BootcampStateDeleteResponse> {
        return this.httpClient.post<BootcampStateDeleteResponse>(this.apiUrl_DeleteBootcampState, bootcampStateDeleteRequest)
    }
    override deleteRangeBootcampState(bootcampStateDeleteRangeRequest: BootcampStateDeleteRangeRequest): Observable<BootcampStateDeleteRangeResponse> {
        return this.httpClient.post<BootcampStateDeleteRangeResponse>(this.apiUrl_DeleteRangeBootcampState, bootcampStateDeleteRangeRequest)
    }
    override restoreBootcampState(bootcampStateRestoreRequest: BootcampStateRestoreRequest): Observable<BootcampStateRestoreResponse> {
        return this.httpClient.post<BootcampStateRestoreResponse>(this.apiUrl_RestoreBootcampState, bootcampStateRestoreRequest)
    }
    override restoreRangeBootcampState(bootcampStateRestoreRangeRequest: BootcampStateRestoreRangeRequest): Observable<BootcampStateRestoreRangeResponse> {
        return this.httpClient.post<BootcampStateRestoreRangeResponse>(this.apiUrl_RestoreRangeBootcampState, bootcampStateRestoreRangeRequest)
    }
    

}