import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { AppliedBootcampResponse } from "../../models/responses/applications/applied-bootcamp-response";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationCreateRequest } from "../../models/requests/applications/application-create-request";
import { ApplicationDeleteRangeRequest } from "../../models/requests/applications/application-delete-range-request";
import { ApplicationDeleteRequest } from "../../models/requests/applications/application-delete-request";
import { ApplicationRestoreRangeRequest } from "../../models/requests/applications/application-restore-range-request";
import { ApplicationRestoreRequest } from "../../models/requests/applications/application-restore-request";
import { ApplicationUpdateRequest } from "../../models/requests/applications/application-update-request";
import { ApplicationCreateResponse } from "../../models/responses/applications/application-create-response";
import { ApplicationDeleteRangeResponse } from "../../models/responses/applications/application-delete-range-response";
import { ApplicationDeleteResponse } from "../../models/responses/applications/application-delete-response";
import { ApplicationGetListDeletedResponse } from "../../models/responses/applications/application-get-list-deleted-response";
import { ApplicationGetListResponse } from "../../models/responses/applications/application-get-list-response";
import { ApplicationRestoreRangeResponse } from "../../models/responses/applications/application-restore-range-response";
import { ApplicationRestoreResponse } from "../../models/responses/applications/application-restore-response";
import { ApplicationUpdateResponse } from "../../models/responses/applications/application-update-response";
import { CheckApplicationResponse } from "../../models/responses/applications/check-application-response";

@Injectable()
export abstract class ApplicationBaseService {

    abstract checkApplication(applicantId: string, bootcampId: string) : Observable<CheckApplicationResponse>
    abstract appliedBootcamps(applicantId: string, pageRequest: PageRequest) : Observable<ListItemsDto<AppliedBootcampResponse>>

    abstract getList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationGetListResponse>>
    abstract getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationGetListDeletedResponse>>
    abstract createApplication(applicationCreateRequest: ApplicationCreateRequest): Observable<ApplicationCreateResponse>
    abstract updateApplication(applicationUpdateRequest: ApplicationUpdateRequest): Observable<ApplicationUpdateResponse>
    abstract deleteApplication(applicationDeleteRequest: ApplicationDeleteRequest): Observable<ApplicationDeleteResponse>
    abstract deleteRangeApplication(applicationDeleteRangeRequest: ApplicationDeleteRangeRequest): Observable<ApplicationDeleteRangeResponse>
    abstract restoreApplication(applicationRestoreRequest: ApplicationRestoreRequest): Observable<ApplicationRestoreResponse>
    abstract restoreRangeApplication(applicationRestoreRangeRequest: ApplicationRestoreRangeRequest): Observable<ApplicationRestoreRangeResponse>

}