import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListItemsDto } from "../../../core/models/pagination/list-items-dto";
import { PageRequest } from "../../../core/models/pagination/page-request";
import { EmployeeCreateRequest } from "../../models/requests/employees/employee-create-request";
import { EmployeeDeleteRangeRequest } from "../../models/requests/employees/employee-delete-range-request";
import { EmployeeDeleteRequest } from "../../models/requests/employees/employee-delete-request";
import { EmployeeRestoreRangeRequest } from "../../models/requests/employees/employee-restore-range-request";
import { EmployeeRestoreRequest } from "../../models/requests/employees/employee-restore-request";
import { EmployeeUpdateRequest } from "../../models/requests/employees/employee-update-request";
import { EmployeeCreateResponse } from "../../models/responses/employees/employee-create-response";
import { EmployeeDeleteRangeResponse } from "../../models/responses/employees/employee-delete-range-response";
import { EmployeeDeleteResponse } from "../../models/responses/employees/employee-delete-response";
import { EmployeeGetListDeletedResponse } from "../../models/responses/employees/employee-get-list-deleted-response";
import { EmployeeGetListResponse } from "../../models/responses/employees/employee-get-list-response";
import { EmployeeRestoreRangeResponse } from "../../models/responses/employees/employee-restore-range-response";
import { EmployeeRestoreResponse } from "../../models/responses/employees/employee-restore-response";
import { EmployeeUpdateResponse } from "../../models/responses/employees/employee-update-response";

@Injectable()
export abstract class EmployeeBaseService {

    abstract getEmployeesList(pageRequest: PageRequest): Observable<ListItemsDto<EmployeeGetListResponse>>
    abstract getEmployeesListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<EmployeeGetListDeletedResponse>>
    abstract createEmployee(employeeCreateRequest: EmployeeCreateRequest): Observable<EmployeeCreateResponse>
    abstract updateEmployee(employeeUpdateRequest: EmployeeUpdateRequest): Observable<EmployeeUpdateResponse>
    abstract deleteEmployee(employeeDeleteRequest: EmployeeDeleteRequest): Observable<EmployeeDeleteResponse>
    abstract deleteRangeEmployee(employeeDeleteRangeRequest: EmployeeDeleteRangeRequest): Observable<EmployeeDeleteRangeResponse>
    abstract restoreEmployee(employeeRestoreRequest: EmployeeRestoreRequest): Observable<EmployeeRestoreResponse>
    abstract restoreRangeEmployee(employeeRestoreRangeRequest: EmployeeRestoreRangeRequest): Observable<EmployeeRestoreRangeResponse>
}