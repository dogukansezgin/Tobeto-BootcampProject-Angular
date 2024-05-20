import { Injectable } from "@angular/core";
import { InstructorBaseService } from "../abstracts/instructor-base.service";
import { Observable, map } from "rxjs";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { InstructorGetListResponse } from "../../models/responses/users/instructors/instructor-get-list-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { InstructorGetBasicInfoResponse } from "../../models/responses/users/instructors/instructor-get-basic-info-response";

@Injectable({
    providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.instructors.getList;
    private readonly apiUrl_GetBasicInfoList: string = environment.apiUrl + environment.endpoints.instructors.getBasicInfo;

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

    

}