import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    jwtHelper: JwtHelperService = new JwtHelperService;
    token!: any;
    
    constructor(private localStorageService: LocalStorageService) {}

    getDecodedToken(){
        try{
        this.token = this.localStorageService.getToken();
        return this.jwtHelper.decodeToken(this.token)

        }
        catch(error){
        return error;

        }
    }

    getCurrentUserId(): string{
        try{
        var decoded = this.getDecodedToken();
        var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
        var userId = decoded[propUserId]
        return userId;

        }
        catch(error){
        console.log(error);
        return "null"

        }
    }

    getCurrentEmailAddress(): string{
        try{
        var decoded = this.getDecodedToken();
        var propUserEmail = Object.keys(decoded).filter(x=>x.endsWith("/emailaddress"))[0]
        var userEmail = decoded[propUserEmail]
        return userEmail;

        }
        catch(error){
        console.log(error);
        return "null"

        }
    }

    getUserRoles(): string[] {
        const token = this.localStorageService.getToken();
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        }
        return [];
    }



}