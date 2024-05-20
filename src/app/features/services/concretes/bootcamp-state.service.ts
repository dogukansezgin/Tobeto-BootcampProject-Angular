import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampStateGetListResponse } from "../../models/responses/bootcamp-states/bootcamp-state-get-list-response";
import { BootcampStateBaseService } from "../abstracts/bootcamp-state-base.service";

@Injectable({
    providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService {

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.bootcampStates.getList;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<ListItemsDto<BootcampStateGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<BootcampStateGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<BootcampStateGetListResponse> = {
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