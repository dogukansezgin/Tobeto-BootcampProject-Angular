export interface ApplicantUpdateRequest{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    nationalIdentity?: string,
    about?: string,
}