import { Injectable } from "@angular/core";
import { ApplicantBaseService } from "../abstracts/applicant-base.service";
import { Observable, catchError, map } from "rxjs";
import { GetApplicantInfoResponse } from "../../models/responses/users/applicant/get-applicant-info-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ApplicantInfoUpdateRequest } from "../../models/requests/users/applicants/applicant-info-update-request";
import { AccessTokenModel } from "../../models/responses/users/access-token-model";
import { LocalStorageService } from "./local-storage.service";
import { ApplicantUpdateRequest } from "../../models/requests/users/applicants/applicant-update-request";
import { GetApplicantResponse } from "../../models/responses/users/applicant/get-applicant-response";
import { ApplicantAboutUpdateRequest } from "../../models/requests/users/applicants/applicant-about-model";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { GetListResponse } from "../../models/responses/applicants/get-list-response";
import { GetListByJoinApplicantListItemDto } from "../../models/responses/applicants/get-list-by-join-applicant-list-item-dto";
import { GetListApplicantListItemDto } from "../../models/responses/applicants/get-list-applicant-list-item-dto";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {

    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.applicants.getApplicantById;
    private readonly apiUrl_UpdateInfo: string = environment.apiUrl + environment.endpoints.applicants.updateApplicantInfo;
    private readonly apiUrl_GetListByJoin: string = environment.apiUrl + environment.endpoints.applicants.getListByJoin;
    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.applicants.getList;

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { super(); }

    override getApplicant(applicantId: string): Observable<GetApplicantResponse> {
        return this.httpClient.get<GetApplicantResponse>(this.apiUrl_GetById + applicantId)
    }

    override updateApplicant(request: ApplicantUpdateRequest): Observable<GetApplicantResponse> {
        return this.httpClient.put<GetApplicantResponse>(this.apiUrl_UpdateInfo, request)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);
                return response;

            }, catchError(responseError => {
                alert(responseError.error)
                throw responseError;

            })
            ));
    }
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
    override getListByJoin(pageRequest: PageRequest): Observable<GetListResponse<GetListByJoinApplicantListItemDto>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<GetListResponse<GetListByJoinApplicantListItemDto>>(this.apiUrl_GetListByJoin, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: GetListResponse<GetListByJoinApplicantListItemDto> = {
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
    override getList(pageRequest: PageRequest): Observable<GetListResponse<GetListApplicantListItemDto>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<GetListResponse<GetListApplicantListItemDto>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: GetListResponse<GetListApplicantListItemDto> = {
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