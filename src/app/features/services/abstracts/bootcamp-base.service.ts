import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BootcampListItemDto } from "../../models/responses/bootcamps/bootcamp-list-item-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";

@Injectable()
export abstract class BootcampBaseService {

    abstract getList(pageRequest: PageRequest): Observable<BootcampListItemDto>
}