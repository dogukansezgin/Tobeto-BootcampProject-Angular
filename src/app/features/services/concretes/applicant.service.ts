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

@Injectable({
    providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {

    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.applicants.getApplicantById;
    private readonly apiUrl_UpdateInfo: string = environment.apiUrl + environment.endpoints.applicants.updateApplicantInfo;

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { super(); }

    override getApplicantInfo(applicantId: string): Observable<GetApplicantInfoResponse> {
        return this.httpClient.get<GetApplicantInfoResponse>(this.apiUrl_GetById + applicantId)
    }

    override updateApplicant(request: ApplicantInfoUpdateRequest): Observable<GetApplicantInfoResponse> {
        return this.httpClient.put<GetApplicantInfoResponse>(this.apiUrl_UpdateInfo, request)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);

                alert("Güncelleme başarılı.");
                return response;

            }, catchError(responseError => {
                alert(responseError.error)
                throw responseError;

            })
            ));
    }
    override getApplicant(applicantId: string): Observable<GetApplicantResponse> {
        return this.httpClient.get<GetApplicantResponse>(this.apiUrl_GetById + applicantId)
    }
    override updateApp(request: ApplicantUpdateRequest): Observable<GetApplicantResponse> {
        return this.httpClient.put<GetApplicantResponse>(this.apiUrl_UpdateInfo, request)
            .pipe(map(response => {
                this.localStorageService.removeToken();
                this.localStorageService.setToken(response.accessToken.token);

                alert("Güncelleme başarılı.");
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
}