import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApplicationStateGetByNameResponse } from "../../models/responses/application-states/application-state-get-by-name-response";

@Injectable()
export abstract class ApplicationStateBaseService {

    abstract getByName(name: string) : Observable<ApplicationStateGetByNameResponse>
}