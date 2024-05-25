import { Injectable } from "@angular/core";
import { InstructorBaseService } from "../abstracts/instructor-base.service";
import { Observable, map } from "rxjs";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { InstructorGetListResponse } from "../../models/responses/instructors/instructor-get-list-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { InstructorGetBasicInfoResponse } from "../../models/responses/instructors/instructor-get-basic-info-response";
import { InstructorCreateRequest } from "../../models/requests/instructors/instructor-create-request";
import { InstructorDeleteRangeRequest } from "../../models/requests/instructors/instructor-delete-range-request";
import { InstructorDeleteRequest } from "../../models/requests/instructors/instructor-delete-request";
import { InstructorRestoreRangeRequest } from "../../models/requests/instructors/instructor-restore-range-request";
import { InstructorRestoreRequest } from "../../models/requests/instructors/instructor-restore-request";
import { InstructorUpdateRequest } from "../../models/requests/instructors/instructor-update-request";
import { InstructorCreateResponse } from "../../models/responses/instructors/instructor-create-response";
import { InstructorDeleteRangeResponse } from "../../models/responses/instructors/instructor-delete-range-response";
import { InstructorDeleteResponse } from "../../models/responses/instructors/instructor-delete-response";
import { InstructorRestoreRangeResponse } from "../../models/responses/instructors/instructor-restore-range-response";
import { InstructorRestoreResponse } from "../../models/responses/instructors/instructor-restore-response";
import { InstructorUpdateResponse } from "../../models/responses/instructors/instructor-update-response";
import { InstructorGetListDeletedResponse } from "../../models/responses/instructors/instructor-get-list-deleted-response";

@Injectable({
    providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.instructors.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.instructors.getListDeleted;
    private readonly apiUrl_GetBasicInfoList: string = environment.apiUrl + environment.endpoints.instructors.getBasicInfo;
    private readonly apiUrl_CreateInstructor = environment.apiUrl + environment.endpoints.instructors.createInstructors;
    private readonly apiUrl_UpdateInstructor = environment.apiUrl + environment.endpoints.instructors.updateInstructors;
    private readonly apiUrl_DeleteInstructor = environment.apiUrl + environment.endpoints.instructors.deleteInstructors;
    private readonly apiUrl_DeleteRangeInstructor = environment.apiUrl + environment.endpoints.instructors.deleteRangeInstructors;
    private readonly apiUrl_RestoreInstructor = environment.apiUrl + environment.endpoints.instructors.restoreInstructors;
    private readonly apiUrl_RestoreRangeInstructor = environment.apiUrl + environment.endpoints.instructors.restoreRangeInstructors;

    constructor(private httpClient: HttpClient) { super(); }

    override getInstructorsList(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<InstructorGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<InstructorGetListResponse> = {
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

    override getInstructorsListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<InstructorGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<InstructorGetListDeletedResponse> = {
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

    override getInstructorsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetBasicInfoResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<InstructorGetBasicInfoResponse>>(this.apiUrl_GetBasicInfoList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<InstructorGetBasicInfoResponse> = {
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

    override createInstructor(instructorCreateRequest: InstructorCreateRequest): Observable<InstructorCreateResponse> {
        return this.httpClient.post<InstructorCreateResponse>(this.apiUrl_CreateInstructor, instructorCreateRequest)
    }
    override updateInstructor(instructorUpdateRequest: InstructorUpdateRequest): Observable<InstructorUpdateResponse> {
        return this.httpClient.put<InstructorUpdateResponse>(this.apiUrl_UpdateInstructor, instructorUpdateRequest)
    }
    override deleteInstructor(instructorDeleteRequest: InstructorDeleteRequest): Observable<InstructorDeleteResponse> {
        return this.httpClient.post<InstructorDeleteResponse>(this.apiUrl_DeleteInstructor, instructorDeleteRequest)
    }
    override deleteRangeInstructor(instructorDeleteRangeRequest: InstructorDeleteRangeRequest): Observable<InstructorDeleteRangeResponse> {
        return this.httpClient.post<InstructorDeleteRangeResponse>(this.apiUrl_DeleteRangeInstructor, instructorDeleteRangeRequest)
    }
    override restoreInstructor(instructorRestoreRequest: InstructorRestoreRequest): Observable<InstructorRestoreResponse> {
        return this.httpClient.post<InstructorRestoreResponse>(this.apiUrl_RestoreInstructor, instructorRestoreRequest)
    }
    override restoreRangeInstructor(instructorRestoreRangeRequest: InstructorRestoreRangeRequest): Observable<InstructorRestoreRangeResponse> {
        return this.httpClient.post<InstructorRestoreRangeResponse>(this.apiUrl_RestoreRangeInstructor, instructorRestoreRangeRequest)
    }

}