import { AccessTokenModel } from "../users/access-token-model";

export interface GetApplicantResponse{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    about?: string,
    accessToken: AccessTokenModel
}