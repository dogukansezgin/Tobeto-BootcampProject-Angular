import { Injectable } from "@angular/core";
import { ApplicantBaseService } from "../abstracts/applicant-base.service";
import { Observable, catchError, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { LocalStorageService } from "./local-storage.service";
import { GetApplicantResponse } from "../../models/responses/applicant/get-applicant-response";
import { ApplicantAboutUpdateRequest } from "../../models/requests/applicants/applicant-about-model";
import { ApplicantUpdateRequest } from "../../models/requests/applicants/applicant-update-request";

@Injectable({
    providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {

    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.applicants.getApplicantById;
    private readonly apiUrl_UpdateInfo: string = environment.apiUrl + environment.endpoints.applicants.updateApplicantInfo;

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
}