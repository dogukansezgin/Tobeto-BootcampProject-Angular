import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { GetBootcampResponse } from "../../models/responses/bootcamps/get-bootcamp-response";

@Injectable()
export abstract class BootcampBaseService {

    abstract getList(pageRequest: PageRequest): Observable<BootcampListItemDto>
    abstract getById(bootcampId: string): Observable<GetBootcampResponse>
    abstract getAllList():Observable<BootcampListItemDto>
}