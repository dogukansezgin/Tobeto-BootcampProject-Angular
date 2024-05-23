import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantResponse } from "../../models/responses/applicant/get-applicant-response";
import { ApplicantAboutUpdateRequest } from "../../models/requests/applicants/applicant-about-model";
import { ApplicantUpdateRequest } from "../../models/requests/applicants/applicant-update-request";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicant(applicantId:string):Observable<GetApplicantResponse>
    abstract updateApplicant(request: ApplicantUpdateRequest) : Observable<GetApplicantResponse>

    abstract updateAboutApplicant(request:ApplicantAboutUpdateRequest):Observable<GetApplicantResponse>
}