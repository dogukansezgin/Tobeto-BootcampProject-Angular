import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantInfoResponse } from "../../models/responses/users/applicant/get-applicant-info-response";
import { ApplicantInfoUpdateRequest } from "../../models/requests/users/applicants/applicant-info-update-request";
import { GetApplicantResponse } from "../../models/responses/users/applicant/get-applicant-response";
import { ApplicantUpdateRequest } from "../../models/requests/users/applicants/applicant-update-request";
import { ApplicantAboutUpdateRequest } from "../../models/requests/users/applicants/applicant-about-model";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { GetListResponse } from "../../models/responses/applicants/get-list-response";
import { GetListByJoinApplicantListItemDto } from "../../models/responses/applicants/get-list-by-join-applicant-list-item-dto";
import { GetListApplicantListItemDto } from "../../models/responses/applicants/get-list-applicant-list-item-dto";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicant(applicantId: string): Observable<GetApplicantResponse>
    abstract updateApplicant(request: ApplicantUpdateRequest): Observable<GetApplicantResponse>

    abstract updateAboutApplicant(request: ApplicantAboutUpdateRequest): Observable<GetApplicantResponse>
    abstract getListByJoin(pageRequest: PageRequest): Observable<GetListResponse<GetListByJoinApplicantListItemDto>>
    abstract getList(pageRequest: PageRequest): Observable<GetListResponse<GetListApplicantListItemDto>>
}