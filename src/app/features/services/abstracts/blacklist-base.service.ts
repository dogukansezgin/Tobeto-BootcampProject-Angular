import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

@Injectable()
export abstract class BlacklistBaseService {

    abstract getList(pageRequest: PageRequest): Observable<ListItemsDto<BlacklistGetListResponse>>
    abstract getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BlacklistGetListDeletedResponse>>
    abstract createBlacklist(blacklistCreateRequest: BlacklistCreateRequest): Observable<BlacklistCreateResponse>
    abstract updateBlacklist(blacklistUpdateRequest: BlacklistUpdateRequest): Observable<BlacklistUpdateResponse>
    abstract deleteBlacklist(blacklistDeleteRequest: BlacklistDeleteRequest): Observable<BlacklistDeleteResponse>
    abstract deleteRangeBlacklist(blacklistDeleteRangeRequest: BlacklistDeleteRangeRequest): Observable<BlacklistDeleteRangeResponse>
    abstract restoreBlacklist(blacklistRestoreRequest: BlacklistRestoreRequest): Observable<BlacklistRestoreResponse>
    abstract restoreRangeBlacklist(blacklistRestoreRangeRequest: BlacklistRestoreRangeRequest): Observable<BlacklistRestoreRangeResponse>

}