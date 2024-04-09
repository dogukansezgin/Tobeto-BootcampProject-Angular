import { AccessTokenModel } from "../access-token-model"

export interface GetApplicantInfoResponse {
    id: string,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalIdentity: string,
    about?: string,
    accessToken: AccessTokenModel
}