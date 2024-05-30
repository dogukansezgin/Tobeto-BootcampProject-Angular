import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { InstructorGetListResponse } from "../../models/responses/instructors/instructor-get-list-response";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { InstructorGetBasicInfoResponse } from "../../models/responses/instructors/instructor-get-basic-info-response";
import { InstructorDeleteRangeRequest } from "../../models/requests/instructors/instructor-delete-range-request";
import { InstructorDeleteRequest } from "../../models/requests/instructors/instructor-delete-request";
import { InstructorRestoreRangeRequest } from "../../models/requests/instructors/instructor-restore-range-request";
import { InstructorRestoreRequest } from "../../models/requests/instructors/instructor-restore-request";
import { InstructorUpdateRequest } from "../../models/requests/instructors/instructor-update-request";
import { InstructorDeleteRangeResponse } from "../../models/responses/instructors/instructor-delete-range-response";
import { InstructorDeleteResponse } from "../../models/responses/instructors/instructor-delete-response";
import { InstructorRestoreRangeResponse } from "../../models/responses/instructors/instructor-restore-range-response";
import { InstructorRestoreResponse } from "../../models/responses/instructors/instructor-restore-response";
import { InstructorUpdateResponse } from "../../models/responses/instructors/instructor-update-response";
import { InstructorCreateRequest } from "../../models/requests/instructors/instructor-create-request";
import { InstructorCreateResponse } from "../../models/responses/instructors/instructor-create-response";
import { InstructorGetListDeletedResponse } from "../../models/responses/instructors/instructor-get-list-deleted-response";
import { InstructorGetBasicInfoByIdResponse } from "../../models/responses/instructors/instructor-get-basic-info-by-id-response";

@Injectable()
export abstract class InstructorBaseService {

    abstract getInstructorsList(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetListResponse>>
    abstract getInstructorsListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetListDeletedResponse>>
    abstract getInstructorsBasicInfoList(pageRequest: PageRequest): Observable<ListItemsDto<InstructorGetBasicInfoResponse>>
    abstract getInstructorBasicInfoById(instructorId: string): Observable<InstructorGetBasicInfoByIdResponse>

    abstract createInstructor(instructorCreateRequest: InstructorCreateRequest): Observable<InstructorCreateResponse>
    abstract updateInstructor(instructorUpdateRequest: InstructorUpdateRequest): Observable<InstructorUpdateResponse>
    abstract deleteInstructor(instructorDeleteRequest: InstructorDeleteRequest): Observable<InstructorDeleteResponse>
    abstract deleteRangeInstructor(instructorDeleteRangeRequest: InstructorDeleteRangeRequest): Observable<InstructorDeleteRangeResponse>
    abstract restoreInstructor(instructorRestoreRequest: InstructorRestoreRequest): Observable<InstructorRestoreResponse>
    abstract restoreRangeInstructor(instructorRestoreRangeRequest: InstructorRestoreRangeRequest): Observable<InstructorRestoreRangeResponse>
}