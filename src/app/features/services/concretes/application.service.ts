import { Injectable } from "@angular/core";
import { ApplicationBaseService } from "../abstracts/application-base.service";
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { ApplicationCreateRequest } from "../../models/requests/applications/application-create-request";
import { ApplicationDeleteRangeRequest } from "../../models/requests/applications/application-delete-range-request";
import { ApplicationDeleteRequest } from "../../models/requests/applications/application-delete-request";
import { ApplicationRestoreRangeRequest } from "../../models/requests/applications/application-restore-range-request";
import { ApplicationRestoreRequest } from "../../models/requests/applications/application-restore-request";
import { ApplicationUpdateRequest } from "../../models/requests/applications/application-update-request";
import { ApplicationCreateResponse } from "../../models/responses/applications/application-create-response";
import { ApplicationDeleteRangeResponse } from "../../models/responses/applications/application-delete-range-response";
import { ApplicationDeleteResponse } from "../../models/responses/applications/application-delete-response";
import { ApplicationGetListDeletedResponse } from "../../models/responses/applications/application-get-list-deleted-response";
import { ApplicationGetListResponse } from "../../models/responses/applications/application-get-list-response";
import { ApplicationRestoreRangeResponse } from "../../models/responses/applications/application-restore-range-response";
import { ApplicationRestoreResponse } from "../../models/responses/applications/application-restore-response";
import { ApplicationUpdateResponse } from "../../models/responses/applications/application-update-response";
import { AppliedBootcampResponse } from "../../models/responses/applications/applied-bootcamp-response";
import { CheckApplicationResponse } from "../../models/responses/applications/check-application-response";

@Injectable({
    providedIn: 'root'
})
export class ApplicationService extends ApplicationBaseService {
    
    private readonly apiUrl_CheckApplication: string = environment.apiUrl + environment.endpoints.applications.checkApplication
    private readonly apiUrl_AppliedBootcamps: string = environment.apiUrl + environment.endpoints.applications.appliedBootcamps
    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.applications.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.applications.getListDeleted;
    private readonly apiUrl_GetByState: string = environment.apiUrl + environment.endpoints.applications.getByState;
  
    private readonly apiUrl_CreateApplication = environment.apiUrl + environment.endpoints.applications.createApplication;
    private readonly apiUrl_UpdateApplication = environment.apiUrl + environment.endpoints.applications.updateApplication;
    private readonly apiUrl_DeleteApplication = environment.apiUrl + environment.endpoints.applications.deleteApplication;
    private readonly apiUrl_DeleteRangeApplication = environment.apiUrl + environment.endpoints.applications.deleteRangeApplication;
    private readonly apiUrl_RestoreApplication = environment.apiUrl + environment.endpoints.applications.restoreApplication;
    private readonly apiUrl_RestoreRangeApplication = environment.apiUrl + environment.endpoints.applications.restoreRangeApplication;
    
    constructor(private httpClient: HttpClient) { super(); }
    
    override getList(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicationGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicationGetListResponse> = {
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
    override getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<ApplicationGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<ApplicationGetListDeletedResponse> = {
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
    override getByState(pageRequest: PageRequest): Observable<ListItemsDto<ApplicationGetListResponse>> {
      const newRequest: { [key: string]: string | number } = {
          pageIndex: pageRequest.pageIndex,
          pageSize: pageRequest.pageSize
      }
      return this.httpClient.get<ListItemsDto<ApplicationGetListResponse>>(this.apiUrl_GetByState, { params: newRequest })
          .pipe(
              map((response) => {
                  const newResponse: ListItemsDto<ApplicationGetListResponse> = {
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

    override checkApplication(applicantId: string, bootcampId: string): Observable<CheckApplicationResponse> {
        const url = `${this.apiUrl_CheckApplication}?applicantId=${applicantId}&bootcampId=${bootcampId}`
        return this.httpClient.get<CheckApplicationResponse>(url)
    }

    override appliedBootcamps(applicantIdRequest: string, pageRequest: PageRequest): Observable<ListItemsDto<AppliedBootcampResponse>> {
        const newRequest: {[key: string]: string | number} = {
            page: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize,
            applicantId: applicantIdRequest
        }

        return this.httpClient.get<ListItemsDto<AppliedBootcampResponse>>(this.apiUrl_AppliedBootcamps, {params: newRequest} )
            .pipe(
                map((response) =>{
                    const newResponse: ListItemsDto<AppliedBootcampResponse> ={
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

    override createApplication(applicationCreateRequest: ApplicationCreateRequest): Observable<ApplicationCreateResponse> {
        return this.httpClient.post<ApplicationCreateResponse>(this.apiUrl_CreateApplication, applicationCreateRequest)
    }
    override updateApplication(applicationUpdateRequest: ApplicationUpdateRequest): Observable<ApplicationUpdateResponse> {
        return this.httpClient.put<ApplicationUpdateResponse>(this.apiUrl_UpdateApplication, applicationUpdateRequest)
    }
    override deleteApplication(applicationDeleteRequest: ApplicationDeleteRequest): Observable<ApplicationDeleteResponse> {
        return this.httpClient.post<ApplicationDeleteResponse>(this.apiUrl_DeleteApplication, applicationDeleteRequest)
    }
    override deleteRangeApplication(applicationDeleteRangeRequest: ApplicationDeleteRangeRequest): Observable<ApplicationDeleteRangeResponse> {
        return this.httpClient.post<ApplicationDeleteRangeResponse>(this.apiUrl_DeleteRangeApplication, applicationDeleteRangeRequest)
    }
    override restoreApplication(applicationRestoreRequest: ApplicationRestoreRequest): Observable<ApplicationRestoreResponse> {
        return this.httpClient.post<ApplicationRestoreResponse>(this.apiUrl_RestoreApplication, applicationRestoreRequest)
    }
    override restoreRangeApplication(applicationRestoreRangeRequest: ApplicationRestoreRangeRequest): Observable<ApplicationRestoreRangeResponse> {
        return this.httpClient.post<ApplicationRestoreRangeResponse>(this.apiUrl_RestoreRangeApplication, applicationRestoreRangeRequest)
    }

}