import { Injectable } from "@angular/core";
import { ApplicantBaseService } from "../abstracts/applicant-base.service";
import { Observable, catchError, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { LocalStorageService } from "./local-storage.service";
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
import { GetListByJoinApplicantListItemDto } from "../../models/responses/applicants/get-list-by-join-applicant-list-item-dto";
import { ApplicantInfoUpdateRequest } from "../../models/requests/applicants/applicant-info-update-request";
import { ApplicantPasswordUpdateResponse } from "../../models/responses/applicant/applicant-password-update-response";
import { ApplicantPasswordUpdateRequest } from "../../models/requests/applicants/applicant-password-update-request";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {


    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.applicants.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.applicants.getListDeleted;
    private readonly apiUrl_GetBasicInfoList: string = environment.apiUrl + environment.endpoints.applicants.getBasicInfo;
    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.applicants.getApplicantById;
    private readonly apiUrl_UpdatePassword: string = environment.apiUrl + environment.endpoints.applicants.updateApplicantPassword;
    private readonly apiUrl_UpdateInfo: string = environment.apiUrl + environment.endpoints.applicants.updateApplicantInfo;
    private readonly apiUrl_CreateApplicant = environment.apiUrl + environment.endpoints.applicants.createApplicants;
    private readonly apiUrl_UpdateApplicant = environment.apiUrl + environment.endpoints.applicants.updateApplicants;
    private readonly apiUrl_DeleteApplicant = environment.apiUrl + environment.endpoints.applicants.deleteApplicants;
    private readonly apiUrl_DeleteRangeApplicant = environment.apiUrl + environment.endpoints.applicants.deleteRangeApplicants;
    private readonly apiUrl_RestoreApplicant = environment.apiUrl + environment.endpoints.applicants.restoreApplicants;
    private readonly apiUrl_RestoreRangeApplicant = environment.apiUrl + environment.endpoints.applicants.restoreRangeApplicants;
    private readonly apiUrl_GetListByJoin: string = environment.apiUrl + environment.endpoints.applicants.getListByJoin;

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { super(); }

    override getApplicantsList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicantGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicantGetListResponse> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            )
    }
    override getApplicantsListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicantGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicantGetListDeletedResponse> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            )
    }
    override getApplicantsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicantGetBasicInfoResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicantGetBasicInfoResponse>>(this.apiUrl_GetBasicInfoList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicantGetBasicInfoResponse> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            )
    }

    override getApplicant(applicantId: string): Observable<GetApplicantResponse> {
        return this.httpClient.get<GetApplicantResponse>(this.apiUrl_GetById + applicantId)
    }
    override updateApplicantPassword(request: ApplicantPasswordUpdateRequest): Observable<ApplicantPasswordUpdateResponse> {
        return this.httpClient.put<ApplicantPasswordUpdateResponse>(this.apiUrl_UpdatePassword, request)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);
                return response;

            }, catchError(responseError => {
                throw responseError;
            })
            ));
    }

    // override updateApplicant(request: ApplicantUpdateRequest): Observable<GetApplicantResponse> {
    //     return this.httpClient.put<GetApplicantResponse>(this.apiUrl_UpdateInfo, request)
    //         .pipe(map(response => {
    //             this.localStorageService.removeToken();
    //             this.localStorageService.setToken(response.accessToken.token);
    //             return response;

    //         }, catchError(responseError => {
    //             alert(responseError.error)
    //             throw responseError;

    //         })
    //         ));
    // }
    override updateAboutApplicant(request: ApplicantAboutUpdateRequest): Observable<GetApplicantResponse> {
        return this.httpClient.put<GetApplicantResponse>(this.apiUrl_UpdateInfo, request)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);
                return response;

            }, catchError(responseError => {
                throw responseError;
            })
            ));
    }

    override createApplicant(applicantCreateRequest: ApplicantCreateRequest): Observable<ApplicantCreateResponse> {
        return this.httpClient.post<ApplicantCreateResponse>(this.apiUrl_CreateApplicant, applicantCreateRequest)
    }
    override updateApplicant(applicantUpdateRequest: ApplicantUpdateRequest): Observable<ApplicantUpdateResponse> {
        return this.httpClient.put<ApplicantUpdateResponse>(this.apiUrl_UpdateApplicant, applicantUpdateRequest)
    }
    override updateInfoApplicant(applicantPatchUpdateRequest: ApplicantInfoUpdateRequest): Observable<GetApplicantResponse> {
        return this.httpClient.put<GetApplicantResponse>(this.apiUrl_UpdateInfo, applicantPatchUpdateRequest)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);
                return response;

            }, catchError(responseError => {
                throw responseError;
            })
            ));
    }
    override deleteApplicant(applicantDeleteRequest: ApplicantDeleteRequest): Observable<ApplicantDeleteResponse> {
        return this.httpClient.post<ApplicantDeleteResponse>(this.apiUrl_DeleteApplicant, applicantDeleteRequest)
    }
    override deleteRangeApplicant(applicantDeleteRangeRequest: ApplicantDeleteRangeRequest): Observable<ApplicantDeleteRangeResponse> {
        return this.httpClient.post<ApplicantDeleteRangeResponse>(this.apiUrl_DeleteRangeApplicant, applicantDeleteRangeRequest)
    }
    override restoreApplicant(applicantRestoreRequest: ApplicantRestoreRequest): Observable<ApplicantRestoreResponse> {
        return this.httpClient.post<ApplicantRestoreResponse>(this.apiUrl_RestoreApplicant, applicantRestoreRequest)
    }
    override restoreRangeApplicant(applicantRestoreRangeRequest: ApplicantRestoreRangeRequest): Observable<ApplicantRestoreRangeResponse> {
        return this.httpClient.post<ApplicantRestoreRangeResponse>(this.apiUrl_RestoreRangeApplicant, applicantRestoreRangeRequest)
    }

    override getListByJoin(pageRequest: PageRequest): Observable<ListItemsDto<GetListByJoinApplicantListItemDto>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<GetListByJoinApplicantListItemDto>>(this.apiUrl_GetListByJoin, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<GetListByJoinApplicantListItemDto> = {
                        items: response.items,
                        index: response.index,
                        size: response.size,
                        count: response.count,
                        pages: response.pages,
                        hasNext: response.hasNext,
                        hasPrevious: response.hasPrevious
                    };
                    return newResponse;
                })

            );
    }

}