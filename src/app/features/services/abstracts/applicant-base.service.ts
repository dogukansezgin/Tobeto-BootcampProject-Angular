import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetApplicantResponse } from "../../models/responses/applicant/get-applicant-response";
import { ApplicantAboutUpdateRequest } from "../../models/requests/applicants/applicant-about-model";
import { ApplicantUpdateRequest } from "../../models/requests/applicants/applicant-update-request";
import { ApplicantCreateRequest } from "../../models/requests/applicants/applicant-create-request";
import { ApplicantDeleteRangeRequest } from "../../models/requests/applicants/applicant-delete-range-request";
import { ApplicantDeleteRequest } from "../../models/requests/applicants/applicant-delete-request";
import { ApplicantRestoreRangeRequest } from "../../models/requests/applicants/applicant-restore-range-request";
import { ApplicantRestoreRequest } from "../../models/requests/applicants/applicant-restore-request";
import { ApplicantCreateResponse } from "../../models/responses/applicant/applicant-create-response";
import { ApplicantDeleteRangeResponse } from "../../models/responses/applicant/applicant-delete-range-response";
import { ApplicantDeleteResponse } from "../../models/responses/applicant/applicant-delete-response";
import { ApplicantRestoreRangeResponse } from "../../models/responses/applicant/applicant-restore-range-response";
import { ApplicantRestoreResponse } from "../../models/responses/applicant/applicant-restore-response";
import { ApplicantUpdateResponse } from "../../models/responses/applicant/applicant-update-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicantGetListDeletedResponse } from "../../models/responses/applicant/applicant-get-list-deleted-response";
import { ApplicantGetListResponse } from "../../models/responses/applicant/applicant-get-list-response";
import { ApplicantGetBasicInfoResponse } from "../../models/responses/applicant/applicant-get-basic-info-response";

@Injectable()
export abstract class ApplicantBaseService {

    abstract getApplicantsList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetListResponse>>
    abstract getApplicantsListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetListDeletedResponse>>
    abstract getApplicantsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetBasicInfoResponse>>
    abstract getApplicant(applicantId:string):Observable<GetApplicantResponse>
    // abstract updateApplicant(request: ApplicantUpdateRequest) : Observable<GetApplicantResponse>

    abstract updateAboutApplicant(request:ApplicantAboutUpdateRequest):Observable<GetApplicantResponse>

    abstract createApplicant(applicantCreateRequest: ApplicantCreateRequest): Observable<ApplicantCreateResponse>
    abstract updateApplicant(applicantUpdateRequest: ApplicantUpdateRequest): Observable<ApplicantUpdateResponse>
    abstract deleteApplicant(applicantDeleteRequest: ApplicantDeleteRequest): Observable<ApplicantDeleteResponse>
    abstract deleteRangeApplicant(applicantDeleteRangeRequest: ApplicantDeleteRangeRequest): Observable<ApplicantDeleteRangeResponse>
    abstract restoreApplicant(applicantRestoreRequest: ApplicantRestoreRequest): Observable<ApplicantRestoreResponse>
    abstract restoreRangeApplicant(applicantRestoreRangeRequest: ApplicantRestoreRangeRequest): Observable<ApplicantRestoreRangeResponse>
}