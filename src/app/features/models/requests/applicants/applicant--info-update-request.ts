export interface ApplicantInfoUpdateRequest{
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string
}