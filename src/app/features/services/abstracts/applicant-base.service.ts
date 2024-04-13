import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantInfoResponse } from "../../models/responses/users/applicant/get-applicant-info-response";
import { ApplicantInfoUpdateRequest } from "../../models/requests/users/applicants/applicant-info-update-request";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicantInfo(applicantId: string) : Observable<GetApplicantInfoResponse> // accesstoken'a bak
    abstract updateApplicant(request: ApplicantInfoUpdateRequest) : Observable<GetApplicantInfoResponse>
}