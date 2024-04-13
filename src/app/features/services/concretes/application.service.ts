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

@Injectable({
    providedIn: 'root'
})
export class ApplicationService extends ApplicationBaseService {
    
    private readonly apiUrl_Post: string = environment.apiUrl + environment.endpoints.applications.post
    private readonly apiUrl_CheckApplication: string = environment.apiUrl + environment.endpoints.applications.checkApplication
    private readonly apiUrl_AppliedBootcamps: string = environment.apiUrl + environment.endpoints.applications.appliedBootcamps
    
    constructor(private httpClient: HttpClient) { super(); }
    
    override postApplication(request: ApplicationPostRequest): Observable<ApplicationPostResponse> {
        return this.httpClient.post<ApplicationPostResponse>(this.apiUrl_Post, request)
    }
    
    override checkApplication(applicantId: string, bootcampId: string): Observable<CheckApplicationResponse> {
        const url = `${this.apiUrl_CheckApplication}?applicantId=${applicantId}&bootcampId=${bootcampId}`
        return this.httpClient.get<CheckApplicationResponse>(url)
    }

    override appliedBootcamps(applicantIdRequest: string, pageRequest: PageRequest): Observable<ApplicationListItemDto> {
        const newRequest: {[key: string]: string | number} = {
            page: pageRequest.page,
            pageSize: pageRequest.pageSize,
            applicantId: applicantIdRequest
        }

        return this.httpClient.get<ApplicationListItemDto>(this.apiUrl_AppliedBootcamps, {params: newRequest} )
            .pipe(
                map((response) =>{
                    const newResponse: ApplicationListItemDto ={
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

}