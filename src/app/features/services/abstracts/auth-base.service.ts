import { Injectable } from "@angular/core";
import { ApplicantForRegisterRequest } from "../../models/requests/users/applicants/applicant-for-register-request";
import { Observable } from "rxjs";
import { AccessTokenModel } from "../../models/responses/users/access-token-model";
import { UserForLoginRequest } from "../../models/requests/users/user-for-login-request";
import { AccessTokenDto } from "../../models/responses/users/access-token-dto";

@Injectable()
export abstract class AuthBaseService {

    abstract registerApplicant(applicantRegisterRequest: ApplicantForRegisterRequest) : Observable<AccessTokenModel>
    abstract login(userForLoginRequest: UserForLoginRequest) :  Observable<AccessTokenDto<AccessTokenModel>>
}