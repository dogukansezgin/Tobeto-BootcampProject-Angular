import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BlacklistCreateRequest } from "../../models/requests/blacklists/blacklist-create-request";
import { BlacklistDeleteRangeRequest } from "../../models/requests/blacklists/blacklist-delete-range-request";
import { BlacklistDeleteRequest } from "../../models/requests/blacklists/blacklist-delete-request";
import { BlacklistRestoreRangeRequest } from "../../models/requests/blacklists/blacklist-restore-range-request";
import { BlacklistRestoreRequest } from "../../models/requests/blacklists/blacklist-restore-request";
import { BlacklistUpdateRequest } from "../../models/requests/blacklists/blacklist-update-request";
import { BlacklistCreateResponse } from "../../models/responses/blacklists/blacklist-create-response";
import { BlacklistDeleteRangeResponse } from "../../models/responses/blacklists/blacklist-delete-range-response";
import { BlacklistDeleteResponse } from "../../models/responses/blacklists/blacklist-delete-response";
import { BlacklistGetListDeletedResponse } from "../../models/responses/blacklists/blacklist-get-list-deleted-response";
import { BlacklistGetListResponse } from "../../models/responses/blacklists/blacklist-get-list-response";
import { BlacklistRestoreRangeResponse } from "../../models/responses/blacklists/blacklist-restore-range-response";
import { BlacklistRestoreResponse } from "../../models/responses/blacklists/blacklist-restore-response";
import { BlacklistUpdateResponse } from "../../models/responses/blacklists/blacklist-update-response";
import { BlacklistBaseService } from "../abstracts/blacklist-base.service";

@Injectable({
    providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {
    

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.blacklists.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.blacklists.getListDeleted;
    private readonly apiUrl_CreateBlacklist = environment.apiUrl + environment.endpoints.blacklists.createBlacklist;
    private readonly apiUrl_UpdateBlacklist = environment.apiUrl + environment.endpoints.blacklists.updateBlacklist;
    private readonly apiUrl_DeleteBlacklist = environment.apiUrl + environment.endpoints.blacklists.deleteBlacklist;
    private readonly apiUrl_DeleteRangeBlacklist = environment.apiUrl + environment.endpoints.blacklists.deleteRangeBlacklist;
    private readonly apiUrl_RestoreBlacklist = environment.apiUrl + environment.endpoints.blacklists.restoreBlacklist;
    private readonly apiUrl_RestoreRangeBlacklist = environment.apiUrl + environment.endpoints.blacklists.restoreRangeBlacklist;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<ListItemsDto<BlacklistGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BlacklistGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BlacklistGetListResponse> = {
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
    override getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BlacklistGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BlacklistGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BlacklistGetListDeletedResponse> = {
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

    override createBlacklist(blacklistCreateRequest: BlacklistCreateRequest): Observable<BlacklistCreateResponse> {
        return this.httpClient.post<BlacklistCreateResponse>(this.apiUrl_CreateBlacklist, blacklistCreateRequest)
    }
    override updateBlacklist(blacklistUpdateRequest: BlacklistUpdateRequest): Observable<BlacklistUpdateResponse> {
        return this.httpClient.put<BlacklistUpdateResponse>(this.apiUrl_UpdateBlacklist, blacklistUpdateRequest)
    }
    override deleteBlacklist(blacklistDeleteRequest: BlacklistDeleteRequest): Observable<BlacklistDeleteResponse> {
        return this.httpClient.post<BlacklistDeleteResponse>(this.apiUrl_DeleteBlacklist, blacklistDeleteRequest)
    }
    override deleteRangeBlacklist(blacklistDeleteRangeRequest: BlacklistDeleteRangeRequest): Observable<BlacklistDeleteRangeResponse> {
        return this.httpClient.post<BlacklistDeleteRangeResponse>(this.apiUrl_DeleteRangeBlacklist, blacklistDeleteRangeRequest)
    }
    override restoreBlacklist(blacklistRestoreRequest: BlacklistRestoreRequest): Observable<BlacklistRestoreResponse> {
        return this.httpClient.post<BlacklistRestoreResponse>(this.apiUrl_RestoreBlacklist, blacklistRestoreRequest)
    }
    override restoreRangeBlacklist(blacklistRestoreRangeRequest: BlacklistRestoreRangeRequest): Observable<BlacklistRestoreRangeResponse> {
        return this.httpClient.post<BlacklistRestoreRangeResponse>(this.apiUrl_RestoreRangeBlacklist, blacklistRestoreRangeRequest)
    }
    
}