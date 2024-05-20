import { Injectable } from "@angular/core";
import { BootcampBaseService } from "../abstracts/bootcamp-base.service";
import { Observable, map } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { GetBootcampResponse } from "../../models/responses/bootcamps/get-bootcamp-response";
import { BootcampSearchItemResponse } from "../../models/responses/bootcamps/bootcamp-search-item-response";
import { BootcampCreateRequest } from "../../models/requests/bootcamps/bootcamp-create-request";
import { BootcampCreateResponse } from "../../models/responses/bootcamps/bootcamp-create-response";
import { BootcampUpdateRequest } from "../../models/requests/bootcamps/bootcamp-update-request";
import { BootcampUpdateResponse } from "../../models/responses/bootcamps/bootcamp-update-response";

@Injectable({
    providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {

    private readonly apiUrl_Get: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcamps;
    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcampById;
    private readonly apiUrl_GetByName: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcampByName;
    private readonly apiUrl_GetUnfinished = environment.apiUrl + environment.endpoints.bootcamps.getUnfinishedBootcamps;
    private readonly apiUrl_GetFinished = environment.apiUrl + environment.endpoints.bootcamps.getFinishedBootcamps;
    private readonly apiUrl_SearchAll = environment.apiUrl + environment.endpoints.bootcamps.searchAllBootcamps;
    private readonly apiUrl_CreateBootcamp = environment.apiUrl + environment.endpoints.bootcamps.createBootcamp;
    private readonly apiUrl_UpdateBootcamp = environment.apiUrl + environment.endpoints.bootcamps.updateBootcamp;

    selectedBootcampId!: string;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<BootcampListItemDto<GetBootcampResponse>>(this.apiUrl_Get, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: BootcampListItemDto<GetBootcampResponse> = {
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

    override getById(bootcampId: string): Observable<GetBootcampResponse> {
        return this.httpClient.get<GetBootcampResponse>(this.apiUrl_GetById + bootcampId);
    }

    override getByName(bootcampName: string): Observable<GetBootcampResponse> {
        return this.httpClient.get<GetBootcampResponse>(this.apiUrl_GetByName + bootcampName);
    }

    override getListUnfinished(pageRequest: PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<BootcampListItemDto<GetBootcampResponse>>(this.apiUrl_GetUnfinished, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: BootcampListItemDto<GetBootcampResponse> = {
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

    override getListFinished(pageRequest: PageRequest): Observable<BootcampListItemDto<GetBootcampResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<BootcampListItemDto<GetBootcampResponse>>(this.apiUrl_GetFinished, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: BootcampListItemDto<GetBootcampResponse> = {
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

    override searchAllBootcamps(): Observable<BootcampListItemDto<BootcampSearchItemResponse>> {
        let urlParameters = '?PageIndex=0&PageSize=5';
        console.log(this.apiUrl_SearchAll + urlParameters)
        return this.httpClient.get<BootcampListItemDto<GetBootcampResponse>>(this.apiUrl_SearchAll + urlParameters);
    }

    override createBootcamp(bootcampCreateRequest: BootcampCreateRequest): Observable<BootcampCreateResponse> {
        return this.httpClient.post<BootcampCreateResponse>(this.apiUrl_CreateBootcamp, bootcampCreateRequest)
    }

    override updateBootcamp(bootcampUpdateRequest: BootcampUpdateRequest): Observable<BootcampUpdateResponse> {
        return this.httpClient.put<BootcampUpdateResponse>(this.apiUrl_UpdateBootcamp, bootcampUpdateRequest)
    }
}