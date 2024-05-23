import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApplicationPostRequest } from "../../models/requests/applications/application-post-request";
import { ApplicationPostResponse } from "../../models/responses/applications/application-post-response";
import { CheckApplicationResponse } from "../../models/responses/applications/check-application-response";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationListItemDto } from "../../models/responses/applications/application-list-item-dto";
import { AppliedBootcampResponse } from "../../models/responses/applications/applied-bootcamp-response";
import { GetListResponse } from "../../models/responses/applications/get-list-response";
import { GetListApplicationListItemDto } from "../../models/responses/applications/get-list-application-list-item-dto";
import { DeletedApplicationResponse } from "../../models/responses/applications/deleted-application-response";
import { UpdatedApplicationResponse } from "../../models/responses/applications/updated-application-response";
import { UpdateApplicationRequest } from "../../models/requests/applications/update-application-request";
import { DeleteApplicationsRequest } from "../../models/requests/applications/delete-applicantions-request";
import { DeleteApplicationsResponse } from "../../models/responses/applications/delete-applications-response";

@Injectable()
export abstract class ApplicationBaseService {

    abstract postApplication(request: ApplicationPostRequest): Observable<ApplicationPostResponse>
    abstract checkApplication(applicantId: string, bootcampId: string): Observable<CheckApplicationResponse>
    abstract appliedBootcamps(applicantId: string, pageRequest: PageRequest): Observable<ApplicationListItemDto>
    abstract getList(pageRequest: PageRequest): Observable<GetListResponse<GetListApplicationListItemDto>>
    abstract deleteApplication(applicationId: string): Observable<DeletedApplicationResponse>
    abstract updateApplication(request: UpdateApplicationRequest): Observable<UpdatedApplicationResponse>
    abstract deleteSelectedApplications(request:DeleteApplicationsRequest):Observable<DeleteApplicationsResponse>
}