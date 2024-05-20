import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { BootcampStateGetListResponse } from "../../models/responses/bootcamp-states/bootcamp-state-get-list-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";

@Injectable()
export abstract class BootcampStateBaseService {

    abstract getList(pageRequest: PageRequest) : Observable<ListItemsDto<BootcampStateGetListResponse>>
}