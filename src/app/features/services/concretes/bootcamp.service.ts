import { Injectable } from "@angular/core";
import { BootcampBaseService } from "../abstracts/bootcamp-base.service";
import { Observable, map } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { BootcampGetListResponse } from "../../models/responses/bootcamps/bootcamp-get-list-response";
import { BootcampSearchItemResponse } from "../../models/responses/bootcamps/bootcamp-search-item-response";
import { BootcampCreateRequest } from "../../models/requests/bootcamps/bootcamp-create-request";
import { BootcampCreateResponse } from "../../models/responses/bootcamps/bootcamp-create-response";
import { BootcampUpdateRequest } from "../../models/requests/bootcamps/bootcamp-update-request";
import { BootcampUpdateResponse } from "../../models/responses/bootcamps/bootcamp-update-response";
import { BootcampDeleteRequest } from "../../models/requests/bootcamps/bootcamp-delete-request";
import { BootcampDeleteResponse } from "../../models/responses/bootcamps/bootcamp-delete-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { BootcampGetListDeletedResponse } from "../../models/responses/bootcamps/bootcamp-get-list-deleted-response";
import { BootcampRestoreRequest } from "../../models/requests/bootcamps/bootcamp-restore-request";
import { BootcampRestoreResponse } from "../../models/responses/bootcamps/bootcamp-restore-response";
import { BootcampDeleteRangeRequest } from "../../models/requests/bootcamps/bootcamp-delete-range-request";
import { BootcampRestoreRangeRequest } from "../../models/requests/bootcamps/bootcamp-restore-range-request";
import { BootcampDeleteRangeResponse } from "../../models/responses/bootcamps/bootcamp-delete-range-response";
import { BootcampRestoreRangeResponse } from "../../models/responses/bootcamps/bootcamp-restore-range-response";
import { BootcampGetBasicInfoResponse } from "../../models/responses/bootcamps/bootcamp-get-basic-info-response";
import { BootcampGetListByInstructorResponse } from "../../models/responses/bootcamps/bootcamp-get-list-by-instructor-response";

@Injectable({
    providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.bootcamps.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.bootcamps.getListDeleted;
    private readonly apiUrl_GetBasicInfoList: string = environment.apiUrl + environment.endpoints.bootcamps.getBasicInfo;
    private readonly apiUrl_GetListByInstructor: string = environment.apiUrl + environment.endpoints.bootcamps.getListByInstructor;
    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcampById;
    private readonly apiUrl_GetByName: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcampByName;
    private readonly apiUrl_GetUnfinished = environment.apiUrl + environment.endpoints.bootcamps.getUnfinishedBootcamps;
    private readonly apiUrl_GetFinished = environment.apiUrl + environment.endpoints.bootcamps.getFinishedBootcamps;
    private readonly apiUrl_SearchAll = environment.apiUrl + environment.endpoints.bootcamps.searchAllBootcamps;
    private readonly apiUrl_CreateBootcamp = environment.apiUrl + environment.endpoints.bootcamps.createBootcamp;
    private readonly apiUrl_UpdateBootcamp = environment.apiUrl + environment.endpoints.bootcamps.updateBootcamp;
    private readonly apiUrl_DeleteBootcamp = environment.apiUrl + environment.endpoints.bootcamps.deleteBootcamp;
    private readonly apiUrl_DeleteRangeBootcamp = environment.apiUrl + environment.endpoints.bootcamps.deleteRangeBootcamp;
    private readonly apiUrl_RestoreBootcamp = environment.apiUrl + environment.endpoints.bootcamps.restoreBootcamp;
    private readonly apiUrl_RestoreRangeBootcamp = environment.apiUrl + environment.endpoints.bootcamps.restoreRangeBootcamp;

    selectedBootcampId!: string;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetListResponse> = {
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
    override getListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetListDeletedResponse> = {
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
    override getBootcampsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetBasicInfoResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampGetBasicInfoResponse>>(this.apiUrl_GetBasicInfoList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetBasicInfoResponse> = {
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
    override getListByInstructor(pageRequest: PageRequest, instructorId: string): Observable<ListItemsDto<BootcampGetListByInstructorResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize,
            instructorId: instructorId
        }
        return this.httpClient.get<ListItemsDto<BootcampGetListByInstructorResponse>>(this.apiUrl_GetListByInstructor, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetListByInstructorResponse> = {
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

    override getById(bootcampId: string): Observable<BootcampGetListResponse> {
        return this.httpClient.get<BootcampGetListResponse>(this.apiUrl_GetById + bootcampId);
    }

    override getByName(bootcampName: string): Observable<BootcampGetListResponse> {
        return this.httpClient.get<BootcampGetListResponse>(this.apiUrl_GetByName + bootcampName);
    }

    override getListUnfinished(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampGetListResponse>>(this.apiUrl_GetUnfinished, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetListResponse> = {
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

    override getListFinished(pageRequest: PageRequest): Observable<ListItemsDto<BootcampGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampGetListResponse>>(this.apiUrl_GetFinished, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampGetListResponse> = {
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

    override searchAllBootcamps(): Observable<ListItemsDto<BootcampSearchItemResponse>> {
        let urlParameters = '?PageIndex=0&PageSize=5';
        console.log(this.apiUrl_SearchAll + urlParameters)
        return this.httpClient.get<ListItemsDto<BootcampGetListResponse>>(this.apiUrl_SearchAll + urlParameters);
    }

    override createBootcamp(bootcampCreateRequest: BootcampCreateRequest): Observable<BootcampCreateResponse> {
        return this.httpClient.post<BootcampCreateResponse>(this.apiUrl_CreateBootcamp, bootcampCreateRequest)
    }

    override updateBootcamp(bootcampUpdateRequest: BootcampUpdateRequest): Observable<BootcampUpdateResponse> {
        return this.httpClient.put<BootcampUpdateResponse>(this.apiUrl_UpdateBootcamp, bootcampUpdateRequest)
    }

    override deleteBootcamp(bootcampDeleteRequest: BootcampDeleteRequest): Observable<BootcampDeleteResponse> {
        return this.httpClient.post<BootcampDeleteResponse>(this.apiUrl_DeleteBootcamp, bootcampDeleteRequest)
    }

    override deleteRangeBootcamp(bootcampDeleteRangeRequest: BootcampDeleteRangeRequest): Observable<BootcampDeleteRangeResponse> {
        return this.httpClient.post<BootcampDeleteRangeResponse>(this.apiUrl_DeleteRangeBootcamp, bootcampDeleteRangeRequest)
    }

    override restoreBootcamp(bootcampRestoreRequest: BootcampRestoreRequest): Observable<BootcampRestoreResponse> {
        return this.httpClient.post<BootcampRestoreResponse>(this.apiUrl_RestoreBootcamp, bootcampRestoreRequest)
    }

    override restoreRangeBootcamp(bootcampRestoreRangeRequest: BootcampRestoreRangeRequest): Observable<BootcampRestoreRangeResponse> {
        return this.httpClient.post<BootcampRestoreRangeResponse>(this.apiUrl_RestoreRangeBootcamp, bootcampRestoreRangeRequest)
    }
}