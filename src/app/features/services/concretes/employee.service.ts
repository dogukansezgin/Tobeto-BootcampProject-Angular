import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
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
import { EmployeeBaseService } from "../abstracts/employee-base.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends EmployeeBaseService {

    private readonly apiUrl_GetList: string = environment.apiUrl + environment.endpoints.employees.getList;
    private readonly apiUrl_GetListDeleted: string = environment.apiUrl + environment.endpoints.employees.getListDeleted;
    private readonly apiUrl_CreateEmployee = environment.apiUrl + environment.endpoints.employees.createEmployees;
    private readonly apiUrl_UpdateEmployee = environment.apiUrl + environment.endpoints.employees.updateEmployees;
    private readonly apiUrl_DeleteEmployee = environment.apiUrl + environment.endpoints.employees.deleteEmployees;
    private readonly apiUrl_DeleteRangeEmployee = environment.apiUrl + environment.endpoints.employees.deleteRangeEmployees;
    private readonly apiUrl_RestoreEmployee = environment.apiUrl + environment.endpoints.employees.restoreEmployees;
    private readonly apiUrl_RestoreRangeEmployee = environment.apiUrl + environment.endpoints.employees.restoreRangeEmployees;

    constructor(private httpClient: HttpClient) { super(); }

    override getEmployeesList(pageRequest: PageRequest): Observable<ListItemsDto<EmployeeGetListResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<EmployeeGetListResponse>>(this.apiUrl_GetList, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<EmployeeGetListResponse> = {
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

    override getEmployeesListDeleted(pageRequest: PageRequest): Observable<ListItemsDto<EmployeeGetListDeletedResponse>> {
        const newRequest: { [key: string]: string | number } = {
            pageIndex: pageRequest.pageIndex,
            pageSize: pageRequest.pageSize
        }
        return this.httpClient.get<ListItemsDto<EmployeeGetListDeletedResponse>>(this.apiUrl_GetListDeleted, { params: newRequest })
            .pipe(
                map((response) => {
                    const newResponse: ListItemsDto<EmployeeGetListDeletedResponse> = {
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

    override createEmployee(employeeCreateRequest: EmployeeCreateRequest): Observable<EmployeeCreateResponse> {
        return this.httpClient.post<EmployeeCreateResponse>(this.apiUrl_CreateEmployee, employeeCreateRequest)
    }
    override updateEmployee(employeeUpdateRequest: EmployeeUpdateRequest): Observable<EmployeeUpdateResponse> {
        return this.httpClient.put<EmployeeUpdateResponse>(this.apiUrl_UpdateEmployee, employeeUpdateRequest)
    }
    override deleteEmployee(employeeDeleteRequest: EmployeeDeleteRequest): Observable<EmployeeDeleteResponse> {
        return this.httpClient.post<EmployeeDeleteResponse>(this.apiUrl_DeleteEmployee, employeeDeleteRequest)
    }
    override deleteRangeEmployee(employeeDeleteRangeRequest: EmployeeDeleteRangeRequest): Observable<EmployeeDeleteRangeResponse> {
        return this.httpClient.post<EmployeeDeleteRangeResponse>(this.apiUrl_DeleteRangeEmployee, employeeDeleteRangeRequest)
    }
    override restoreEmployee(employeeRestoreRequest: EmployeeRestoreRequest): Observable<EmployeeRestoreResponse> {
        return this.httpClient.post<EmployeeRestoreResponse>(this.apiUrl_RestoreEmployee, employeeRestoreRequest)
    }
    override restoreRangeEmployee(employeeRestoreRangeRequest: EmployeeRestoreRangeRequest): Observable<EmployeeRestoreRangeResponse> {
        return this.httpClient.post<EmployeeRestoreRangeResponse>(this.apiUrl_RestoreRangeEmployee, employeeRestoreRangeRequest)
    }
}