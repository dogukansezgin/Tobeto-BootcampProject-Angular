import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApplicationPostRequest } from "../../models/requests/applications/application-post-request";
import { ApplicationPostResponse } from "../../models/responses/applications/application-post-response";
import { CheckApplicationResponse } from "../../models/responses/applications/check-application-response";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationListItemDto } from "../../models/responses/applications/application-list-item-dto";
import { AppliedBootcampResponse } from "../../models/responses/applications/applied-bootcamp-response";

@Injectable()
export abstract class ApplicationBaseService {

    abstract postApplication(request: ApplicationPostRequest) : Observable<ApplicationPostResponse>
    abstract checkApplication(applicantId: string, bootcampId: string) : Observable<CheckApplicationResponse>
    abstract appliedBootcamps(applicantId: string, pageRequest: PageRequest) : Observable<ApplicationListItemDto>
}