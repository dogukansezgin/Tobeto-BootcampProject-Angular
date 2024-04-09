import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantInfoResponse } from "../../models/responses/users/applicant/get-applicant-info-response";
import { ApplicantInfoUpdateRequest } from "../../models/requests/users/applicants/applicant-info-update-request";
import { AccessTokenModel } from "../../models/responses/users/access-token-model";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicantInfo(applicantId: string) : Observable<GetApplicantInfoResponse>
    abstract updateApplicant(request: ApplicantInfoUpdateRequest) : Observable<GetApplicantInfoResponse>
}