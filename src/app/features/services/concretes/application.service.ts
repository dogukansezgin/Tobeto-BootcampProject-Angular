import { Injectable } from "@angular/core";
import { ApplicationBaseService } from "../abstracts/application-base.service";
import { Observable, map } from "rxjs";
import { ApplicationPostRequest } from "../../models/requests/applications/application-post-request";
import { ApplicationPostResponse } from "../../models/responses/applications/application-post-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { CheckApplicationResponse } from "../../models/responses/applications/check-application-response";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationListItemDto } from "../../models/responses/applications/application-list-item-dto";
import { GetListApplicationListItemDto } from "../../models/responses/applications/get-list-application-list-item-dto";
import { GetListResponse } from "../../models/responses/applications/get-list-response";
import { DeletedApplicationResponse } from "../../models/responses/applications/deleted-application-response";
import { UpdatedApplicationResponse } from "../../models/responses/applications/updated-application-response";
import { UpdateApplicationRequest } from "../../models/requests/applications/update-application-request";
import { DeleteApplicationsRequest } from "../../models/requests/applications/delete-applicantions-request";
import { DeleteApplicationsResponse } from "../../models/responses/applications/delete-applications-response";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService extends ApplicationBaseService {

    private readonly apiUrl_GetBy: string = environment.apiUrl + environment.endpoints.applications.getApplications;
    private readonly apiUrl_Post: string = environment.apiUrl + environment.endpoints.applications.post
    private readonly apiUrl_CheckApplication: string = environment.apiUrl + environment.endpoints.applications.checkApplication
    private readonly apiUrl_AppliedBootcamps: string = environment.apiUrl + environment.endpoints.applications.appliedBootcamps
    private readonly apiUrl_Delete: string = environment.apiUrl + environment.endpoints.applications.deleteApplication;
    private readonly apiUrl_Put: string = environment.apiUrl + environment.endpoints.applications.updateApplication;
    private readonly apiUrl_DeleteSelected: string = environment.apiUrl + environment.endpoints.applications.deleteSelected;
    private readonly apiUrl_GetByState: string = environment.apiUrl + environment.endpoints.applications.getByState;

    constructor(private httpClient: HttpClient) { super(); }

    override postApplication(request: ApplicationPostRequest): Observable<ApplicationPostResponse> {
        return this.httpClient.post<ApplicationPostResponse>(this.apiUrl_Post, request)
    }

    override checkApplication(applicantId: string, bootcampId: string): Observable<CheckApplicationResponse> {
        const url = `${this.apiUrl_CheckApplication}?applicantId=${applicantId}&bootcampId=${bootcampId}`
        return this.httpClient.get<CheckApplicationResponse>(url)
    }

    override appliedBootcamps(applicantIdRequest: string, pageRequest: PageRequest): Observable<ApplicationListItemDto> {
        const newRequest: { [key: string]: string | number } = {
            page: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize,
            applicantId: applicantIdRequest
        }

        return this.httpClient.get<ApplicationListItemDto>(this.apiUrl_AppliedBootcamps, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ApplicationListItemDto = {
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
    override getList(pageRequest: PageRequest): Observable<GetListResponse<GetListApplicationListItemDto>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<GetListResponse<GetListApplicationListItemDto>>(this.apiUrl_GetByState, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: GetListResponse<GetListApplicationListItemDto> = {
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
    override deleteApplication(applicationId: string): Observable<DeletedApplicationResponse> {
        const newUrl = this.apiUrl_Delete + applicationId;
        return this.httpClient.delete<DeletedApplicationResponse>(newUrl);
    }
    override updateApplication(request: UpdateApplicationRequest): Observable<UpdatedApplicationResponse> {
        return this.httpClient.put<UpdatedApplicationResponse>(this.apiUrl_Put, request);
    }
    override deleteSelectedApplications(request: DeleteApplicationsRequest): Observable<DeleteApplicationsResponse> {
        return this.httpClient.post<DeleteApplicationsResponse>(this.apiUrl_DeleteSelected, request);
    }

}