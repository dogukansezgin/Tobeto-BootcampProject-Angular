import { Observable } from "rxjs";
import { GetUserInfoResponse } from "../../models/responses/users/user/get-user-info-response";
import { UserBaseService } from "../abstracts/user-base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService extends UserBaseService {

    private readonly apiUrl_GetById: string = environment.apiUrl + environment.endpoints.users.getUserById;

    constructor(private httpClient: HttpClient) { super(); }

    override getUserInfo(userId: string): Observable<GetUserInfoResponse> {
        return this.httpClient.get<GetUserInfoResponse>(this.apiUrl_GetById + userId)
    }

}