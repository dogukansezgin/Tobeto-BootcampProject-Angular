import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantInfoResponse } from "../../models/responses/users/applicant/get-applicant-info-response";
import { ApplicantInfoUpdateRequest } from "../../models/requests/users/applicants/applicant-info-update-request";
import { GetApplicantResponse } from "../../models/responses/users/applicant/get-applicant-response";
import { ApplicantUpdateRequest } from "../../models/requests/users/applicants/applicant-update-request";
import { ApplicantAboutUpdateRequest } from "../../models/requests/users/applicants/applicant-about-model";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicantInfo(applicantId: string) : Observable<GetApplicantInfoResponse> // accesstoken'a bak
    abstract updateApplicant(request: ApplicantInfoUpdateRequest) : Observable<GetApplicantInfoResponse>

    abstract getApplicant(applicantId:string):Observable<GetApplicantResponse>
    abstract updateApp(request:ApplicantUpdateRequest):Observable<GetApplicantResponse>

    abstract updateAboutApplicant(request:ApplicantAboutUpdateRequest):Observable<GetApplicantResponse>
}