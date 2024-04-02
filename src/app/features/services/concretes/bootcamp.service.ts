import { Injectable } from "@angular/core";
import { BootcampBaseService } from "../abstracts/bootcamp-base.service";
import { Observable, map } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {

    private readonly apiUrl_Get: string = environment.apiUrl + environment.endpoints.bootcamps.getBootcamps;

    constructor(private httpClient: HttpClient) { super(); }

    override getList(pageRequest: PageRequest): Observable<BootcampListItemDto> {
        const newRequest: {[key: string]: string | number} = {
            page: pageRequest.page,
            pageSize: pageRequest.pageSize
        }

        return this.httpClient.get<BootcampListItemDto>(this.apiUrl_Get, {params: newRequest} )
            .pipe(
                map((response) =>{
                    const newResponse: BootcampListItemDto ={
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