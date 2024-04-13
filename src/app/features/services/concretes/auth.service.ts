import { Injectable } from "@angular/core";
import { AuthBaseService } from "../abstracts/auth-base.service";
import { Observable, catchError, map } from "rxjs";
import { ApplicantForRegisterRequest } from "../../models/requests/users/applicants/applicant-for-register-request";
import { AccessTokenModel } from "../../models/responses/users/access-token-model";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserForLoginRequest } from "../../models/requests/users/user-for-login-request";
import { AccessTokenDto } from "../../models/responses/users/access-token-dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends AuthBaseService {
    
    token:any;
    jwtHelper: JwtHelperService = new JwtHelperService;
    
    private readonly apiUrl_RegisterApplicant: string = environment.apiUrl + environment.endpoints.auth.register.applicant;
    private readonly apiUrl_Login: string = environment.apiUrl + environment.endpoints.auth.login.userLogin;
    
    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { super(); }
    
    override registerApplicant(applicantRegisterRequest: ApplicantForRegisterRequest): Observable<AccessTokenModel> {

        return this.httpClient.post<AccessTokenModel>(this.apiUrl_RegisterApplicant, applicantRegisterRequest)
    }
    
    override login(userForLoginRequest: UserForLoginRequest): Observable<AccessTokenDto<AccessTokenModel>> {

        return this.httpClient.post<AccessTokenDto<AccessTokenModel>>(this.apiUrl_Login, userForLoginRequest)
            .pipe(map(response =>{
                this.localStorageService.setToken(response.accessToken.token);
                alert("Giriş yapıldı.");
                return response;
            }, catchError(responseError =>{
                alert(responseError.error)
                throw responseError;
            })
        ));
    }
    

    loggedIn(): boolean{

        this.token = this.localStorageService.getToken();
        let isExpired = this.jwtHelper.isTokenExpired(this.token);
        if(isExpired){
            console.log(isExpired, "Token süresi doldu mu ?")
            this.localStorageService.removeToken();
        }

        return !isExpired;
    }

    logOut(){

        this.localStorageService.removeToken();
        alert("Çıkış yapıldı.")
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    
}