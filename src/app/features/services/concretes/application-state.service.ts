import { Injectable } from "@angular/core";
import { ApplicationStateBaseService } from "../abstracts/application-state-base.service";
import { Observable } from "rxjs";
import { ApplicationStateGetByNameResponse } from "../../models/responses/application-states/application-state-get-by-name-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApplicationStateService extends ApplicationStateBaseService {

    private readonly apiUrl_GetByName: string = environment.apiUrl + environment.endpoints.applicationStates.getByName;

    constructor(private httpClient: HttpClient) { super(); }

    override getByName(name: string): Observable<ApplicationStateGetByNameResponse> {
        return this.httpClient.get<ApplicationStateGetByNameResponse>(this.apiUrl_GetByName + name)
    }

}