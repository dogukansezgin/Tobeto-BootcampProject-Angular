import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetUserInfoResponse } from "../../models/responses/users/get-user-info-response";


@Injectable()
export abstract class UserBaseService {

    abstract getUserInfo(userId: string) : Observable<GetUserInfoResponse>
}