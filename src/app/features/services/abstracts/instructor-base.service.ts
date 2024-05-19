import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { InstructorGetListResponse } from "../../models/responses/users/instructors/instructor-get-list-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";

@Injectable()
export abstract class InstructorBaseService {

    abstract getInstructorsList(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetListResponse>>
}